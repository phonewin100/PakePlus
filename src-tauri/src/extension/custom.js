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
//打印构建信息
//拦截页面跳转行为（<a target="_blank"> 和 window.open）
//防止新窗口打开，强制在当前窗口跳转
function init() {
    console.log(
        '%cbuild from PakePlus： https://github.com/Sjj1024/PakePlus',
        'color:orangered;font-weight:bolder'
    )

    // very important, if you don't know what it is, don't touch it
    // 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
    const hookClick = (e) => {
        const origin = e.target.closest('a')
        const isBaseTargetBlank = document.querySelector(
            'head base[target="_blank"]'
        )
        console.log('origin', origin, isBaseTargetBlank)
        if (
            (origin && origin.href && origin.target === '_blank') ||
            (origin && origin.href && isBaseTargetBlank)
        ) {
            e.preventDefault()
            console.log('handle origin', origin)
            location.href = origin.href
        } else {
            console.log('not handle origin', origin)
        }
    }

    window.open = function(url, target, features) {
        console.log('open', url, target, features)
        location.href = url
    }

    document.addEventListener('click', hookClick, { capture: true })

}

function execute() {
    document.title = "课本点读-点读通";

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
    if (boxs) {
        boxs.forEach(box => {
            box.style.border = '0px';
            box.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        });
    }


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

    // 获取所有符合.delete-btn条件的元素（由于delete-btn是后加载的，需要通过定时任务替换）
    document.querySelectorAll('.delete-btn').forEach(el => {
        // 保存原来的 onclick 字符串
        var oldOnclick = el.getAttribute('onclick');
        if (oldOnclick && oldOnclick.includes('deleteTextbook')) {
            // 替换函数名：deleteTextbook → enhancedDeleteTextbook
            var newOnclick = oldOnclick.replace(/deleteTextbook/g, 'enhancedDeleteTextbook');
            // 移除旧的 onclick 属性
            el.removeAttribute('onclick');
            // 添加新的 onclick
            el.setAttribute('onclick', newOnclick);
        }
    });

}

function doInterval() {
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

}

doInterval();

init();

//检测窗口变化
window.addEventListener('resize', () => {
    doInterval()
});

// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    mySet();
});

function mySet() {
    const target = document.getElementById('directoryOverlay');
    if (target) {
        // 读取 localStorage 中的翻译状态
        let name = '翻译隐藏';
        const translation = localStorage.getItem('translation'); // 0: 隐藏, 1: 显示
        if (translation === '0') {
            name = '翻译显示';
        }
        // 插入设置面板
        target.insertAdjacentHTML('afterend', `
            <div class="directory-overlay" id="setOverlay" style="display: none;">
                <div class="directory-container">
                    <div class="directory-title">设置</div>
                    <ul class="directory-list">
                        <li class="directory-item" onclick="window.location.href='index.php'">到达首页</li>
                        <li class="directory-item" onclick="translationSet()">${name}</li>                       
                    </ul>
                </div>
            </div>
        `);
    }

    // ✅ 将函数挂载到 window 上，使其可在 HTML 中调用
    window.showSet = function() {
        document.getElementById('setOverlay').style.display = 'block';
    };

    window.hideSet = function() {
        document.getElementById('setOverlay').style.display = 'none';
    };

    window.translationSet = function() {
        const current = localStorage.getItem('translation');
        // 切换状态：0 → 1，1 → 0，null → 0
        const next = current === '0' ? '1' : '0';
        localStorage.setItem('translation', next);

        // 更新按钮文字
        const item = document.querySelector('#setOverlay .directory-item[onclick="translationSet()"]');
        item.textContent = next === '0' ? '翻译显示' : '翻译隐藏';

        hideSet(); // 关闭设置面板
    };

    // ✅ 修改 header 按钮点击事件
    const firstButton = document.querySelector('.header .header-btn');
    if (firstButton) {
        firstButton.innerHTML = '设置';
        firstButton.onclick = function(e) {
            e.preventDefault();
            showSet();
        };
    }

    // ✅ 点击遮罩层关闭（排除内部容器）
    const setOverlay = document.getElementById('setOverlay');
    if (setOverlay) {
        setOverlay.addEventListener('click', function(e) {
            // 只有点击遮罩层本身（非内部容器）才关闭
            if (e.target === setOverlay) {
                hideSet();
            }
        });
    }

    // 覆盖翻译功能
    window.showTranslation = function(text) {
        if (!text || '-' == text) return;
        const translationBox = document.getElementById('translationBox');
        translationBox.textContent = text;
        const current = localStorage.getItem('translation');
        translationBox.style.display = current === '0' ? 'none' : 'block';
        // 点击翻译框隐藏
        translationBox.onclick = function() {
            hideTranslation();
        };
    }

    //一键清空功能
    window.clearAll = function() {
        localStorage.setItem('textbooks', "[]");
        location.reload();
    }

    // 增加增强版删除课本功能
    window.enhancedDeleteTextbook = function(bookname, event) {
        event.stopPropagation();
        const updatedBooks = JSON.parse(localStorage.getItem('textbooks'))
            .filter(book => book.bookname !== bookname); // 比较 bookname

        localStorage.setItem('textbooks', JSON.stringify(updatedBooks));
        // renderTextbookList();

        const container = document.getElementById('textbookList');
        const textbooks = initTextbookData();
        container.innerHTML = textbooks.map(book => `
            <div class="textbook-card" onclick="openTextbook('${book.bookname}')">
                <img src="http://www.diandutong.top/book/img/${book.bookname}.jpg" class="textbook-cover">
                <div class="delete-btn" onclick="enhancedDeleteTextbook('${book.bookname}', event)">×</div>
            </div>
        `).join('');
        // 添加添加课本按钮
        container.innerHTML += `
            <div class="textbook-card" onclick="addTextbook()">
                <div class="add-card">
                    <div class="add-icon">+</div>
                    <div>添加课本</div>
                </div>
            </div>
        `;

    }

    // 增加增强版添加课本功能
    window.enhancedAddTextbook = function(bookname, event) {
        event.stopPropagation();

        // 获取已选课本列表
        const selectedTextbooks = JSON.parse(localStorage.getItem('textbooks')) || [];

        // 检查是否已添加
        if (selectedTextbooks.some(book => book.bookname === bookname)) {
            window.location.href = 'index.php';
            return;
        }

        // 添加课本ID
        selectedTextbooks.push({ bookname: bookname });
        localStorage.setItem('textbooks', JSON.stringify(selectedTextbooks));

        window.location.href = 'index.php';
    };

    // 获取所有符合.book-item条件的元素
    document.querySelectorAll('.book-item').forEach(el => {
        // 保存原来的 onclick 字符串
        var oldOnclick = el.getAttribute('onclick');
        if (oldOnclick && oldOnclick.includes('addTextbook')) {
            // 替换函数名：addTextbook → enhancedAddTextbook
            var newOnclick = oldOnclick.replace(/addTextbook/g, 'enhancedAddTextbook');
            // 移除旧的 onclick 属性
            el.removeAttribute('onclick');
            // 添加新的 onclick
            el.setAttribute('onclick', newOnclick);
        }
    });

    // 底部添加一键清空功能
    // var copyright = document.querySelector('.copyright');
    // if (copyright) {
    //     var newDiv = document.createElement('div');
    //     newDiv.setAttribute('onclick', 'clearAll()');
    //     newDiv.textContent = '一键清空';
    //     // 设置内联样式（固定在底部）
    //     newDiv.style.position = 'fixed';
    //     newDiv.style.bottom = '0';
    //     newDiv.style.left = '0';
    //     newDiv.style.width = '100%';
    //     newDiv.style.textAlign = 'center';
    //     newDiv.style.zIndex = '9999'; // 可选：确保在最上层
    //     // newDiv.style.backgroundColor = '#fff'; // 可选：背景色
    //     newDiv.style.padding = '8px 0'; // 可选：增加点击区域
    //     document.body.appendChild(newDiv);
    // }

}
// end config.js
