(function() {
  let comments = document.querySelectorAll('.athing');
  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];

    let indent_level = comment.querySelector('td.ind img');
    if (indent_level === null) {
      continue;
    }

    let comment_head = comment.querySelector('.comhead');
    let username = comment.querySelector('.comhead a');

    let collapse = document.createElement('a');
    collapse.style.cursor = 'pointer';
    collapse.style.marginRight = 5;
    collapse.appendChild(document.createTextNode('[-]'));
    comment_head.insertBefore(collapse, username);

    collapse.onclick = function() {
      let op_indent = null;
      let new_display = '';

      for (let j = 0; j < comments.length; j++) {
        let indent = comments[j].querySelector('td.ind img');

        if (indent === null) {
          continue;
        }

        if (comments[j] === comment) {
          let text = comments[j].querySelector('.comment');
          if (text.style.display === '') {
            new_display = 'none';
          }
          text.style.display = new_display;
          collapse.innerHTML = new_display === '' ? '[-]' : '[+]';
          op_indent = indent.width;
          continue;
        }

        if (op_indent === null) {
          continue;
        }

        if (indent.width <= op_indent) {
          break;
        }

        comments[j].style.display = new_display;
      }
    };
  }
})();
