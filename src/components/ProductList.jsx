/**
 * Reusable product list. It displays records and reports user actions
 * back to its parent instead of making its own API requests.
 */
function ProductList({ products, loading, onRefresh, onEdit, onDelete }) {
  return (
    <section className="card">
      <div className="section-title">
        <h2>Products</h2>
        <button type="button" className="secondary" onClick={onRefresh} disabled={loading}>
          Refresh
        </button>
      </div>

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
                <small>
                  ₱{Number(product.price).toFixed(2)} · {product.quantity} in stock
                </small>
              </div>

              <div className="actions">
                <button type="button" className="secondary" onClick={() => onEdit(product)}>
                  Edit
                </button>
                <button type="button" className="danger" onClick={() => onDelete(product.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default ProductList
