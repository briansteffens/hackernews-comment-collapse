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
    collapse.className = 'addon-comment-collapse';
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
      let min_ignore_indent = Number.MAX_SAFE_INTEGER;

      for (let j = i + 1; j < comments.length; j++) {
        // Loop until the end of sub-comments
        let indent = comments[j].querySelector('td.ind img').width;
        if (indent <= origin_indent) {
          break;
        }

        // Skip nested collapsed subtrees
        if (indent >= min_ignore_indent) {
          continue;
        }

        comments[j].style.display = text.style.display;

        // Identify nested collapsed subtrees
        let sub = comments[j].querySelector('.addon-comment-collapse');
        if (sub.textContent == '[+]') {
          min_ignore_indent = indent + 1;
        } else {
          min_ignore_indent = Number.MAX_SAFE_INTEGER;
        }
      }
    };

    let comment_head = comment.querySelector('.comhead');
    comment_head.insertBefore(collapse, comment_head.firstChild);
  }
})();
