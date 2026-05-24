function getSavedBrands() {
    var saved = localStorage.getItem('brands');
    if (saved) {
        return JSON.parse(saved);
    } else {
        return [];
    }
}

function showSavedBrands() {
    var wrapper = document.getElementById('brands-wrapper');
    var savedBrands = getSavedBrands();
    
    for (var i = 0; i < savedBrands.length; i++) {
        var brand = savedBrands[i];
        var slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = '<img class="brand-image" src="' + brand.image + 
        '" onerror="this.src=\'images/placeholder.png\'" /> <p class="brand-name">' 
        + brand.name + '</p>';
        wrapper.appendChild(slide);
    }   
    window.brandsSwiper.update();
}

function validName() {
    var nameInput = document.getElementById('brand-name');
    var nameError = document.getElementById('name-error');
    var name = nameInput.value;
    
    if (name == "") {
        nameInput.classList.add('error-input');
        nameError.textContent = "Введите название бренда";
        return false;
    }   
    nameInput.classList.remove('error-input');
    nameError.textContent = "";
    return true;
}

function validImage() {
    var imageInput = document.getElementById('brand-image');
    var imageError = document.getElementById('image-error');
    var image = imageInput.value;
    
    if (image == "") {
        imageInput.classList.add('error-input');
        imageError.textContent = "Введите ссылку на изображение";
        return false;
    }
    imageInput.classList.remove('error-input');
    imageError.textContent = "";
    return true;
}

function addBrand(event) {
    event.preventDefault();
    
    var nameFlag = validName();
    var imageFlag = validImage();
    
    if (nameFlag && imageFlag) {
        var nameInput = document.getElementById('brand-name');
        var imageInput = document.getElementById('brand-image');     
        var name = nameInput.value;
        var image = imageInput.value;
        var brands = getSavedBrands();
        
        brands.push({ name: name, image: image });
        localStorage.setItem('brands', JSON.stringify(brands));
        
        var wrapper = document.getElementById('brands-wrapper');
        var slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = '<img class="brand-image" src="' + image +
        '" onerror="this.src=\'images/placeholder.png\'" /> <p class="brand-name">' + 
        name + '</p>';
        wrapper.appendChild(slide);
        
        window.brandsSwiper.update();
        
        nameInput.value = '';
        imageInput.value = '';
    }
}

function clearNameError() {
    var nameInput = document.getElementById('brand-name');
    var nameError = document.getElementById('name-error');
    nameInput.classList.remove('error-input');
    nameError.textContent = "";
}

function clearImageError() {
    var imageInput = document.getElementById('brand-image');
    var imageError = document.getElementById('image-error');
    imageInput.classList.remove('error-input');
    imageError.textContent = "";
}

function initSlider() {
    window.swiper = new Swiper('.top-slider', {
        slidesPerView: 1,
        spaceBetween: 0,                  
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
}

function initBrandsSlider() {
    window.brandsSwiper = new Swiper('.brands-slider', {
        slidesPerView: 'auto',
        spaceBetween: 40,
        freeMode: true,
        breakpoints: {
            640: {spaceBetween: 30},
            320: {spaceBetween: 20}
        }
    });
}

initSlider();
initBrandsSlider();
showSavedBrands();

document.getElementById('brand-form').onsubmit = addBrand;
document.getElementById('brand-name').oninput = clearNameError;
document.getElementById('brand-image').oninput = clearImageError;