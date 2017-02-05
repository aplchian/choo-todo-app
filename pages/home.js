const html = require('choo/html')
const {map,curry} = require('ramda')

module.exports = function (state, prev, send) {
  return html`
    <main>
      <h1>${state.title}</h1>
      <form onsubmit=${addTodo}>
        <input type="text"  />
        <button>add</button>
      </form>
      <div>
        <ul>
          ${map(renderTodos,state.items)}
        </ul>
      </div>
    </main>
  `

  function addTodo(e){
    const input = e.target.children[0]
    send('postTodo',{title: input.value, completed: false})
    input.value = ''
    e.preventDefault()
  }

  function renderTodos(todo) {
    return html`<li>${todo.title}</li>`
  }

  function update(e) {
    send('update', e.target.value)
  }
}
