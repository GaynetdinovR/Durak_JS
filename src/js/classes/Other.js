import Swal from 'sweetalert2';

export default class Other {
    /**
     * Возвращает случайный элемент массива
     * @param {*} array []
     * @returns array[random]
     */
    getRandomArrayElem = (array) => {
        return array[Math.floor(Math.random() * array.length)];
    };

    /**
     * Показывает уведомление
     * @param {*} message string
     * @param {*} icon error/info/success/question
     */
    notification = (message, icon) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: icon,
            text: message,
        });
    };
}
