window.onload = () => {
  if (window.location.pathname === "/signup") {
    document.querySelector('.cont').classList.add('s--signup');
  } else if (window.location.pathname === "/login") {
    document.querySelector('.img__btn').addEventListener('click', function () {
      document.querySelector('.cont').classList.toggle('s--signup');
    });
  }
}