function ListItems({ items, renderItem, emptyMessage = "No items found." }) {
  if (!items.length) return <p>{emptyMessage}</p>;

  return (
    <div>
      {items.map((item, idx) => (
        <div key={idx}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

export default ListItems;
