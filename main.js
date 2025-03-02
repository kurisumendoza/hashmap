import HashMap from './hashmap.js';

const test = new HashMap();

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('hat', 'olive');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('moon', 'silver');

// test.remove('hat');
// test.clear();

console.log('GET APPLE:', test.get('apple'));
console.log('GET HAT:', test.get('hat'));

console.log('HAS ICE CREAM:', test.has('ice cream'));
console.log('HAS MANGO:', test.has('mango'));

console.log('NUMBER OF KEYS:', test.length());

console.log('ARRAY OF KEYS:', test.keys());
console.log('ARRAY OF VALUES:', test.values());
console.log('ARRAY OF ENTRIES:', test.entries());
