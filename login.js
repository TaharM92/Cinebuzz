document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    if (email.trim() === '' || password.trim() === '') {
        alert('Veuillez remplir tous les champs');
        return;
    }
    
    console.log('Tentative de connexion:', {
        email: email,
        password: password,
        remember: remember
    });
    
    if (email === 'test@cinebuzz.com' && password === 'test123') {
        localStorage.setItem('user', JSON.stringify({ email: email, remember: remember }));
        alert('Connexion réussie!');

        window.location.href = 'CineBuzz.html';
    } else {
        alert('Email ou mot de passe incorrect');
    }
});

window.addEventListener('DOMContentLoaded', function() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        document.getElementById('email').value = user.email;
        document.getElementById('remember').checked = user.remember;
    }
});