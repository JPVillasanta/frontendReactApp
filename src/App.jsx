import { useEffect, useState } from 'react'
import './index.css'

// Vite exposes variables that begin with VITE_ to browser code.
// Copy .env.example to .env and change this URL if your Laravel port changes.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api'

const emptyProduct = {
  name: '',
  description: '',
  price: '',
  quantity: '',
}

function App() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyProduct)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  // Load the API list when this component first appears.
  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch(`${API_URL}/products`)
      if (!response.ok) throw new Error('Could not load products.')

      setProducts(await response.json())
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Keep a form field in React state while the user types.
  function handleChange(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const isEditing = editingId !== null
    const url = isEditing ? `${API_URL}/products/${editingId}` : `${API_URL}/products`
    const method = isEditing ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          // HTML inputs give strings; convert numbers before sending JSON.
          price: Number(form.price),
          quantity: Number(form.quantity),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message ?? 'Could not save product.')
      }

      setForm(emptyProduct)
      setEditingId(null)
      await loadProducts()
      setMessage(isEditing ? 'Product updated.' : 'Product created.')
    } catch (error) {
      setMessage(error.message)
    }
  }

  // Put an existing product into the form so the user can edit it.
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

  function cancelEditing() {
    setForm(emptyProduct)
    setEditingId(null)
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

      <section className="card">
        <h2>{editingId ? 'Edit product' : 'Add product'}</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required maxLength="100" />
          </label>

          <label>
            Description
            <textarea name="description" value={form.description} onChange={handleChange} maxLength="500" />
          </label>

          <div className="two-columns">
            <label>
              Price
              <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required />
            </label>

            <label>
              Quantity
              <input name="quantity" type="number" min="0" step="1" value={form.quantity} onChange={handleChange} required />
            </label>
          </div>

          <div className="actions">
            <button type="submit">{editingId ? 'Save changes' : 'Create product'}</button>
            {editingId && <button type="button" className="secondary" onClick={cancelEditing}>Cancel</button>}
          </div>
        </form>
      </section>

      <section className="card">
        <div className="section-title">
          <h2>Products</h2>
          <button type="button" className="secondary" onClick={loadProducts}>Refresh</button>
        </div>

        {message && <p className="message">{message}</p>}
        {loading ? (
          <p>Loading products…</p>
        ) : products.length === 0 ? (
          <p>No products yet. Create your first one above.</p>
        ) : (
          <ul className="product-list">
            {products.map((product) => (
              <li key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <p>{product.description || 'No description'}</p>
                  <small>₱{Number(product.price).toFixed(2)} · {product.quantity} in stock</small>
                </div>
                <div className="actions">
                  <button type="button" className="secondary" onClick={() => startEditing(product)}>Edit</button>
                  <button type="button" className="danger" onClick={() => deleteProduct(product.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
