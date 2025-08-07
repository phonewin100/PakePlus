/*
 * This file serves as a collection point for external JS and CSS dependencies.
 * It amalgamates these external resources for easier injection into the application.
 * Additionally, you can directly include any script files in this file
 * that you wish to attach to the application.
 */
console.log(
    '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
    'color:orangered;font-weight:bolder'
)

document.addEventListener('DOMContentLoaded', () => {
    const originalWindowOpen = window.open
    window.open = function (url, _, features) {
        return originalWindowOpen.call(window, url, '_self', features)
    }
    console.log('window.open has been overridden to open in the current page.')
})

document.addEventListener('DOMContentLoaded', () => {
    const targetNode = document.body
    // 配置观察选项
    const config = {
        childList: true,
        subtree: true,
    }
    const observer = new MutationObserver((mutationsList, observer) => {
        let htmlContent = document.documentElement.innerHTML
        console.log(
            'window.open has been overridden to open in the current page.'
        )
        for (const mutation of mutationsList) {
            if (
                mutation.type === 'childList' &&
                htmlContent.includes('_blank')
            ) {
                const links = document.querySelectorAll('a[target="_blank"]')
                links.forEach((link) => {
                    link.addEventListener('click', function (event) {
                        event.preventDefault()
                        window.location.href = link.href
                    })
                })
            }
        }
    })
    observer.observe(targetNode, config)
})
// config.js
function execute() {
    // 隐藏 .nav-item
    var navItem = document.querySelector('.nav-item');
    if (navItem) {
        navItem.style.display = 'none';
    }

    // 隐藏 .copyright
    var copyright = document.querySelector('.copyright');
    if (copyright) {
        copyright.style.display = 'none';
    }

    //修改hotspot-box样式
    const boxs = document.querySelectorAll('.hotspot-box');
    boxs.forEach(box => {
        box.style.border = '0px';
        box.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    });

    //修改hotspot-box-hover样式
    // 动态添加 CSS 类定义
    const style = document.createElement('style');
    style.innerHTML = `
    .hotspot-box-hover {
    	border:1px solid !important;
        background-color: rgba(0, 255, 0, 0.2) !important;
        border-color: rgba(0, 255, 0, 0.4) !important;
        box-shadow : 0 0 10px rgba(0, 255, 0, 0.5) !important;
    }
    .hotspot-box-hover {
    	border:1px solid !important;
        background-color: rgba(0, 0, 0, 0) !important;
        border-color: rgba(0, 255, 0, 0.4) !important;
        box-shadow : 0 0 10px rgba(0, 255, 0, 0.5) !important;
    }
    `;
    document.head.appendChild(style);

    // 绑定事件
    document.querySelectorAll('.hotspot-box').forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.classList.add('hotspot-box-hover');
        });
        box.addEventListener('mouseleave', () => {
            box.classList.remove('hotspot-box-hover');
        });
    });

    //将'完全免费使用'改为'课本同步使用'
    document.querySelectorAll('div.book-publisher').forEach(function(div) {
        if (div.textContent.trim() === '完全免费使用') {
            div.textContent = '课本同步使用';
        }
    });

}

let time = 1;
const intervalId = setInterval(() => {
    execute();
    time++;

    // 当执行次数超过500次（约5秒，因为每10ms执行一次）
    if (time > 500) {
        clearInterval(intervalId);
        console.log("定时器已清除，共执行了", time, "次");
    }
}, 10);
// end config.js
