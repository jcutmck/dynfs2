export const objArrayLister = (array, key) => {

 // return <div>{listItems}</div>;  //this returns a jsx object
 // alternate, the next line returns a string of the same data instead
 return  array.map(item => item[key]).join(', ');
}