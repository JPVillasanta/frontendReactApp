import { useEffect, useState } from 'react'
import ProductForm from '../components/ProductForm.jsx'
import ProductList from '../components/ProductList.jsx'

// Vite exposes variables that begin with VITE_ to browser code.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api'

const EMPTY_PRODUCT = {
  name: '',
  description: '',
  price: '',
  quantity: '',
}

/**
 * Product page owns the data and API requests.
 * The form and list are separate components so they can be reused elsewhere.
 */
export default function Product() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(EMPTY_PRODUCT)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  // Fetch the product list when the page first loads.
  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/products`)
      if (!response.ok) throw new Error('Could not load products.')

      setProducts(await response.json())
      setMessage('')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)

    const isEditing = editingId !== null
    const url = isEditing
      ? `${API_URL}/products/${editingId}`
      : `${API_URL}/products`

    try {
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          // Form input values are strings; Laravel expects numeric values here.
          price: Number(form.price),
          quantity: Number(form.quantity),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message ?? 'Could not save product.')
      }

      resetForm()
      await loadProducts()
      setMessage(isEditing ? 'Product updated.' : 'Product created.')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setSaving(false)
    }
  }

  function startEditing(product) {
    setForm({
      name: product.name,
      description: product.description ?? '',
      price: product.price,
      quantity: product.quantity,
    })
    setEditingId(product.id)
    setMessage('')
  }

  function resetForm() {
    setForm(EMPTY_PRODUCT)
    setEditingId(null)
  }

  function cancelEditing() {
    resetForm()
    setMessage('')
  }

  async function deleteProduct(id) {
    if (!window.confirm('Delete this product?')) return

    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Could not delete product.')

      await loadProducts()
      setMessage('Product deleted.')
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <main className="container">
      <header>
        <p className="eyebrow">React + Laravel boilerplate</p>
        <h1>Product CRUD</h1>
        <p>Add, view, edit, and delete products through the Laravel API.</p>
      </header>

      <ProductForm
        values={form}
        editing={editingId !== null}
        saving={saving}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={cancelEditing}
      />

      {message && <p className="message" role="status">{message}</p>}

      <ProductList
        products={products}
        loading={loading}
        onRefresh={loadProducts}
        onEdit={startEditing}
        onDelete={deleteProduct}
      />
    </main>
  )
}
