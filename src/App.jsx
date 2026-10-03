import { useState } from "react";
import "./App.css";

function App() {
  const [quantity, setQuantity] = useState(1);
  const [input, setInput] = useState("");

  const [items, setItems] = useState([
  ]);

  const addItem = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    setItems([
      ...items,
      {
        id: Date.now(),
        name: input,
        quantity: Number(quantity),
        packed: false,
      },
    ]);

    setInput("");
    setQuantity(1);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const togglePacked = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const clearList = () => {
    setItems([]);
  };

  const packedItems = items.filter((item) => item.packed).length;
  const percentage =
    items.length === 0
      ? 0
      : Math.round((packedItems / items.length) * 100);

  return (
    <div className="app">

      <header className="header">

        <div className="travel-title">
          <span className="island">🏝️</span>
          <span>FAR AWAY</span>
          <span className="suitcase">🧳</span>
        </div>
      </header>

      <section className="form-section">

        <form onSubmit={addItem} className="item-form">
          <label>
            What do you need for your 😍 trip?
          </label>

          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Item..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button type="submit">ADD</button>
        </form>
      </section>

      <section className="packing-section">

        <div className="items-container">
          {items.map((item) => (
            <div
              className={`packing-item ${item.packed ? "packed" : ""
                }`}
              key={item.id}
            >
              <div className="item-left">
                <input
                  type="checkbox"
                  checked={item.packed}
                  onChange={() => togglePacked(item.id)}
                />

                <span>
                  {item.quantity} {item.name}
                </span>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteItem(item.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>


        <div className="packing-bottom">

          <div className="list-actions">
            <select>
              <option>SORT BY INPUT ORDER</option>
              <option>SORT BY PACKED</option>
              <option>SORT BY ALPHABETICAL</option>
            </select>

            <button onClick={clearList}>CLEAR LIST</button>
          </div>
        </div>
      </section>

      <footer className="stats">
        <p>
          🧳 You have <strong>{items.length}</strong> items on your
          list, and you already packed <strong>{packedItems}</strong>{" "}
          ({percentage}%)
        </p>
      </footer>
    </div>
  );
}

export default App;


