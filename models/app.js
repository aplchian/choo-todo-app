const {assoc,append} = require('ramda')
const pouchDB = require('pouchdb')
const db = new pouchDB('todos-choo')


module.exports = {
  state: {
    title: 'Todos',
    items: []
  },
  reducers: {
    update(state,data){
      return {title: data}
    },
    addTodo(state,data){
      const newTodos = append(data,state.items)
      return assoc('items',newTodos,state)
    }
  },
  effects: {
    // asynchronous operations that don't modify state directly.
    // Triggered by actions, can call actions. Signature of (data, state, send, done)
    /*
    myEffect: function (state, data, send, done) {
      // do stuff
    }
    */
    postTodo(state,data,send,done){
      const newTodos = append(data,state.items)
      // return assoc('items',newTodos,state)
      const date = new Date
      console.log('date',date);
      const todo = {
        _id: date.toISOString(),
      }

      db.post(todo)
        .then(res => {
          console.log('res',res);
          send('addTodo',data,done)
        })
        .catch(err => {
          console.log('Err!',err);
        })
    }


  },
  subscriptions: {
    // asynchronous read-only operations that don't modify state directly.
    // Can call actions. Signature of (send, done).
    /*
    checkStuff: function (send, done) {
      setInterval(function () {
        send('update', data, function (err) {
          if (err) return done(err)
        })
      }, 1000)
    }
    */
  }
}
