import { useEffect, useState } from 'react'
import ProductForm from '../components/ProductForm.jsx'
import ProductList from '../components/ProductList.jsx'

// Configure this in the frontend .env file if the Laravel URL changes.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api'

const EMPTY_PRODUCT = {
  name: '',
  description: '',
  price: '',
  quantity: '',
}

/**
 * Product page owns product state and HTTP requests.
 * ProductForm and ProductList focus only on rendering and user interaction.
 */
function ProductPage() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(EMPTY_PRODUCT)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`${API_URL}/products`)
      if (!response.ok) throw new Error('Could not load products.')

      setProducts(await response.json())
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setLoading(false)
    }
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  function resetForm() {
    setForm(EMPTY_PRODUCT)
    setEditingId(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setMessage('')
    setError('')

    const editing = editingId !== null
    const endpoint = editing
      ? `${API_URL}/products/${editingId}`
      : `${API_URL}/products`

    try {
      const response = await fetch(endpoint, {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          // Input elements return strings; send numeric values to Laravel.
          price: Number(form.price),
          quantity: Number(form.quantity),
        }),
      })

      const result = response.status === 204 ? null : await response.json()
      if (!response.ok) {
        throw new Error(result?.message ?? 'Could not save product.')
      }

      resetForm()
      await loadProducts()
      setMessage(editing ? 'Product updated.' : 'Product created.')
    } catch (requestError) {
      setError(requestError.message)
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
    setError('')
  }

  function cancelEditing() {
    resetForm()
    setMessage('')
    setError('')
  }

  async function deleteProduct(id) {
    if (!window.confirm('Delete this product?')) return

    setMessage('')
    setError('')

    try {
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error('Could not delete product.')

      await loadProducts()
      setMessage('Product deleted.')
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  return (
    <main className="container">
      <header className="page-heading">
        <p className="eyebrow">CRUD example</p>
        <h2>Product Manager</h2>
        <p>Create, view, update, and delete products through the Laravel API.</p>
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
      {error && <p className="error-message" role="alert">{error}</p>}

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

export default ProductPage
