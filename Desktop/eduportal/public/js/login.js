document.getElementById('refreshCaptcha').addEventListener('click', () => {
  document.getElementById('captchaImg').src = '/captcha?' + Date.now();
});