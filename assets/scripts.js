// Asegúrate de que el DOM esté completamente cargado antes de ejecutar cualquier código.
document.addEventListener("DOMContentLoaded", function() {
    // 1. Mostrar un mensaje de bienvenida cuando el usuario visita la página por primera vez
    welcomeMessage();
  
    // 2. Registro de Service Worker para una PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(function(registration) {
          console.log('Service Worker registrado con éxito:', registration);
        })
        .catch(function(error) {
          console.error('Error al registrar el Service Worker:', error);
        });
    }
  
    // 3. Funcionalidad para notificaciones push
    if ('Notification' in window && navigator.serviceWorker) {
      document.getElementById('notify-button').addEventListener('click', () => {
        requestNotificationPermission();
      });
    }
  
    // 4. Función para manejar el mensaje de bienvenida
    function welcomeMessage() {
      // Verificar si es la primera visita del usuario
      if (!localStorage.getItem('visited')) {
        alert("¡Bienvenido a la Radio Ungidos del Rey de Reyes!");
        localStorage.setItem('visited', 'true'); // Marcar como visitado
      }
    }
  
    // 5. Función para solicitar permisos de notificación push
    function requestNotificationPermission() {
      // Solicitar permiso para enviar notificaciones
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          new Notification("¡Gracias por suscribirte a nuestras notificaciones!");
        } else {
          console.log('Permiso de notificación denegado.');
        }
      });
    }
  
    // 6. Mostrar un mensaje de alerta cuando un formulario se envíe (ejemplo de funcionalidad)
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar envío de formulario
        alert('¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.');
      });
    }
  });