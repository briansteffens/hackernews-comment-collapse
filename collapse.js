(function() {
  let comments = document.querySelectorAll('.athing');
  for (let i = 0; i < comments.length; i++) {
    let comment = comments[i];

    // Skip OP
    if (comment.querySelector('td.ind img') === null) {
      continue;
    }

    let collapse = document.createElement('a');
    collapse.style.cursor = 'pointer';
    collapse.style.marginRight = 5;
    collapse.style.fontFamily = 'monospace';
    collapse.appendChild(document.createTextNode('[-]'));

    collapse.onclick = function() {
      let text = comment.querySelector('.comment');

      // Toggle display
      text.style.display = text.style.display === '' ? 'none' : '';

      while (collapse.firstChild) {
        collapse.removeChild(collapse.firstChild);
      }
      collapse.appendChild(document.createTextNode(
          text.style.display === '' ? '[-]' : '[+]'));

      let origin_indent = comment.querySelector('td.ind img').width;

      for (let j = i + 1; j < comments.length; j++) {
        // Loop until the end of sub-comments
        if (comments[j].querySelector('td.ind img').width <= origin_indent) {
          break;
        }

        comments[j].style.display = text.style.display;
      }
    };

    let comment_head = comment.querySelector('.comhead');
    let username = comment.querySelector('.comhead a');
    comment_head.insertBefore(collapse, username);
  }
})();
