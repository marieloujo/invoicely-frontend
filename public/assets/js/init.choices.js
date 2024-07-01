const elements = document.querySelectorAll('.choices-single');
if (elements) {
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        new Choices(element);
    }
}