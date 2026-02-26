function ListItems({ items, renderItem, emptyMessage = "No items found." }) { //SETS AN EMPTY MESSAGE
  if (!items.length) return <p>{emptyMessage}</p>; //IF NO ITEMS FOUND, DISPLAY THE EMPTY MESSAGE

  return (
    <div>
      {items.map((item, idx) => ( //USE MAP TO LOOK THROUGH ALL ITEMS IN ARRAY //ITEM IS ITEM + IDX IS ARRAY INDEX
        <div key={idx}>{renderItem(item)}</div> //DISPLAY ITEMS
      ))}
    </div>
  );
}

export default ListItems;
