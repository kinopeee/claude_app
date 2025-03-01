document.addEventListener('DOMContentLoaded', function() {
    // ヘッダーのスクロール効果
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // モバイルメニュートグル
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            document.body.style.overflow = '';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // モバイルメニューが開いている場合は閉じる
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                document.body.style.overflow = '';
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });

    // アニメーション効果
    const fadeElements = document.querySelectorAll('.section');
    
    const fadeInOptions = {
        threshold: 0.2
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(element);
    });

    // 現在表示されているセクションに基づいてナビゲーションをハイライト
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 10;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ページロード時のアニメーション
    window.addEventListener('load', function() {
        document.querySelector('.hero-content').style.opacity = 1;
        document.querySelector('.hero-content').style.transform = 'translateY(0)';
    });

    document.querySelector('.hero-content').style.opacity = 0;
    document.querySelector('.hero-content').style.transform = 'translateY(20px)';
    document.querySelector('.hero-content').style.transition = 'opacity 1s ease, transform 1s ease';
});
