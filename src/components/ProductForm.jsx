/**
 * Reusable controlled form for creating or editing a product.
 * The page supplies its values and event handlers through props.
 */
function ProductForm({ values, editing, saving, onChange, onSubmit, onCancel }) {
  return (
    <section className="card">
      <h2>{editing ? 'Edit product' : 'Add product'}</h2>

      <form onSubmit={onSubmit}>
        <label>
          Name
          <input
            name="name"
            value={values.name}
            onChange={onChange}
            required
            maxLength="100"
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={values.description}
            onChange={onChange}
            maxLength="500"
          />
        </label>

        <div className="two-columns">
          <label>
            Price
            <input
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={values.price}
              onChange={onChange}
              required
            />
          </label>

          <label>
            Quantity
            <input
              name="quantity"
              type="number"
              min="0"
              step="1"
              value={values.quantity}
              onChange={onChange}
              required
            />
          </label>
        </div>

        <div className="actions">
          <button type="submit" disabled={saving}>
            {saving ? 'Saving…' : editing ? 'Save changes' : 'Create product'}
          </button>
          {editing && (
            <button
              type="button"
              className="secondary"
              onClick={onCancel}
              disabled={saving}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default ProductForm
