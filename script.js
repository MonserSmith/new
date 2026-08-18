document.addEventListener('DOMContentLoaded', function() {

    // ---- 初始化 highlight.js ----
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }

    // ---- DOM 引用 ----
    const slides = document.querySelectorAll('.slide');
    const total = slides.length;
    let current = 0;

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentSpan = document.getElementById('currentPage');
    const totalSpan = document.getElementById('totalPages');
    const dotsContainer = document.getElementById('dotsContainer');

    // ---- 更新视图 ----
    function updateSlide(index, animate = true) {
        if (index < 0) index = 0;
        if (index >= total) index = total - 1;
        current = index;

        slides.forEach((el, i) => {
            el.classList.toggle('active', i === current);
        });

        currentSpan.textContent = current + 1;

        prevBtn.classList.toggle('disabled', current === 0);
        nextBtn.classList.toggle('disabled', current === total - 1);

        document.querySelectorAll('.nav-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === current);
        });

        slides[current].scrollTop = 0;

        if (typeof hljs !== 'undefined') {
            const activeCode = slides[current].querySelectorAll('pre code');
            activeCode.forEach((block) => {
                hljs.highlightElement(block);
            });
        }
    }

    // ---- 导航函数 ----
    function goPrev() {
        if (current > 0) updateSlide(current - 1);
    }

    function goNext() {
        if (current < total - 1) updateSlide(current + 1);
    }

    // ---- 生成圆点 ----
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('span');
        dot.className = 'nav-dot' + (i === 0 ? ' active' : '');
        dot.dataset.index = i;
        dot.addEventListener('click', function() {
            const idx = parseInt(this.dataset.index);
            if (idx !== current) updateSlide(idx);
        });
        dotsContainer.appendChild(dot);
    }

    // ---- 事件绑定 ----
    prevBtn.addEventListener('click', goPrev);
    nextBtn.addEventListener('click', goNext);

    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            goPrev();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            goNext();
        } else if (e.key === 'Home') {
            e.preventDefault();
            updateSlide(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            updateSlide(total - 1);
        }
    });

    // 触摸滑动 (移动端)
    let touchStartX = 0;
    let touchStartY = 0;
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        const dx = e.changedTouches[0].screenX - touchStartX;
        const dy = e.changedTouches[0].screenY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
            if (dx < 0) goNext();
            else goPrev();
        }
    }, { passive: true });

    // ---- 设置总数 ----
    totalSpan.textContent = total;

    // ---- 初始状态 ----
    updateSlide(0, false);

    console.log('✅ 幻灯片已启动，共 ' + total + ' 页');
});


