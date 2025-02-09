function toggleSidebar() {
    const sidebar = document.getElementById("mughader_mobile_sidebar");
    const overlay = document.getElementById("mughader_sidebar_overlay");

    if (sidebar.style.right === "0px") {
        closeSidebar();
    } else {
        sidebar.style.right = "0px"; // Show sidebar
        overlay.classList.add("active"); // Show overlay
    }
}

function closeSidebar() {
    const sidebar = document.getElementById("mughader_mobile_sidebar");
    const overlay = document.getElementById("mughader_sidebar_overlay");

    sidebar.style.right = "-250px"; // Hide sidebar
    overlay.classList.remove("active"); // Hide overlay
}









const section = document.querySelector(".wow_effect_section");

function createFloatingElement() {
    const element = document.createElement("div");
    element.classList.add("floating_element");

    // Random position
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * window.innerHeight;

    // Random size (more variation)
    const size = Math.random() * 80 + 30; // Min 30px, Max 110px
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;

    // Random animation duration (slower movement)
    const duration = Math.random() * 6 + 4; // 4s to 10s
    element.style.animationDuration = `${duration}s`;

    // Random blur for depth effect
    const blurValue = Math.random() * 3 + 1;
    element.style.filter = `blur(${blurValue}px)`;

    // Random opacity for some circles to be more visible
    element.style.opacity = Math.random() * 0.6 + 0.4; // Between 0.4 and 1

    element.style.left = `${posX}px`;
    element.style.top = `${posY}px`;

    section.appendChild(element);

    // Remove after animation ends
    setTimeout(() => {
        element.remove();
    }, duration * 1000);
}

// Generate floating elements continuously
setInterval(createFloatingElement, 800);
















const words = [
    "رحلات سياحية",
    "جورجيا",
    "اذربيجان",
    "اندونيسيا",
    "ماليزيا",
    "تايلاند",
    "عروض سياحية",
];

let currentIndex = 1;
const dynamicWordElement = document.getElementById("mughader_dynamic_word_switch");
const lineTimerElement = document.getElementById("mughader_line_timer");

// Ensure the initial word is visible
dynamicWordElement.classList.add("visible");

function updateTimerWidth() {
    const wordWidth = dynamicWordElement.offsetWidth; // Get the width of the current word
    const scaledWidth = wordWidth * 1; // Adjust width to 40% of the word's width (smaller)
    lineTimerElement.style.width = `${scaledWidth}px`; // Set timer line width
    lineTimerElement.style.margin = "0 auto"; // Center the timer under the text
}

function resetTimer() {
    lineTimerElement.style.transition = "none"; // Disable transition to reset instantly
    lineTimerElement.style.width = "0"; // Reset width to 0
    setTimeout(() => {
        lineTimerElement.style.transition = "width 1.8s linear"; // Reapply transition
        lineTimerElement.style.width = `${dynamicWordElement.offsetWidth * 1}px`; // Start animation
    }, 50); // Small delay to ensure transition is reapplied
}

function changeWord() {
    // Fade out by removing 'visible' class
    dynamicWordElement.classList.remove("visible");

    setTimeout(() => {
        // Change word
        dynamicWordElement.innerText = words[currentIndex];
        currentIndex = (currentIndex + 1) % words.length;

        // Fade in by adding 'visible' class
        dynamicWordElement.classList.add("visible");

        // Update timer width
        updateTimerWidth();
    }, 300); // Match CSS fade duration

    // Reset and start the timer line animation
    resetTimer();
}

// Start the loop
setInterval(changeWord, 1800); // Match the timer line animation duration

// Adjust the timer width for the initial word
updateTimerWidth();
resetTimer(); // Start timer animation for the first word














let chatbotIcon = document.getElementById("mughader_chatbot_icon");
let chatSidebar = document.getElementById("mughader_chat_sidebar");
let closeChat = document.getElementById("mughader_close_chat");
let sendBtn = document.getElementById("mughader_send_btn");
let messageBar = document.getElementById("mughader_message_bar");
let messageBox = document.querySelector(".mughader_message_box");
let chatOverlay = document.getElementById("mughader_chat_overlay");

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY = "sk-***76cA";

/* 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 */

// Check if the user is on a mobile device
const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);

// Open Slider if ai bot icon is clicked
chatbotIcon.addEventListener("click", () => {
    chatSidebar.classList.add("active");
    chatOverlay.classList.add("active");
});

// Close Sidebar if close slider button is clicked
closeChat.addEventListener("click", () => {
    chatSidebar.classList.remove("active");
    chatOverlay.classList.remove("active");
});

// Close Sidebar if Overlay is Clicked
chatOverlay.addEventListener("click", () => {
    chatSidebar.classList.remove("active");
    chatOverlay.classList.remove("active");
});

// Send Message Function
sendBtn.onclick = function () {
    if (messageBar.value.trim() !== "") {
        let UserTypedMessage = messageBar.value.trim();
        messageBar.value = "";

        let userMessage = `
                <div class="chat message">
                    <span>${UserTypedMessage}</span>
                </div>
            `;

        let botResponse = `
                <div class="chat response">
                    <img src="مكتب-سياحي/مكتب-سياحي-بحريني.webp">
                    <span class="new">...</span>
                </div>
            `;

        messageBox.insertAdjacentHTML("beforeend", userMessage);

        setTimeout(() => {
            messageBox.insertAdjacentHTML("beforeend", botResponse);

            let requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: UserTypedMessage }]
                })
            };

            fetch(API_URL, requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    let ChatBotResponse = document.querySelector(".response .new");
                    ChatBotResponse.innerHTML = data.choices[0].message.content;
                    ChatBotResponse.classList.remove("new");
                })
                .catch(() => {
                    let ChatBotResponse = document.querySelector(".response .new");
                    ChatBotResponse.innerHTML = "الموقع مازال في وضع التجربة";
                });
        }, 100);



        document.getElementById("mughader_message_bar").style.height = "40px"; // Reset to default height;
    }
};

// Attach Send Message Function to Enter Key (for Desktop)
if (!isMobileDevice) {
    messageBar.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Prevent default behavior
            sendBtn.click();
        } else if (event.key === "Enter" && event.shiftKey) {
            event.preventDefault(); // Allow Shift+Enter to insert a new line
            const cursorPosition = messageBar.selectionStart;
            messageBar.value =
                messageBar.value.substring(0, cursorPosition) + "\n" + messageBar.value.substring(cursorPosition);
            messageBar.selectionStart = messageBar.selectionEnd = cursorPosition + 1; // Move cursor to the new line
            messageBar.style.height = "auto"; // Reset height to auto
            messageBar.style.height = `${messageBar.scrollHeight}px`; // Adjust height based on content
        }
    });
}

// Enable Enter for New Line Only (for Mobile)
if (isMobileDevice) {
    messageBar.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent sending the message
            const cursorPosition = messageBar.selectionStart;
            messageBar.value =
                messageBar.value.substring(0, cursorPosition) + "\n" + messageBar.value.substring(cursorPosition);
            messageBar.selectionStart = messageBar.selectionEnd = cursorPosition + 1; // Move cursor to the new line
            messageBar.style.height = "auto"; // Reset height to auto
            messageBar.style.height = `${messageBar.scrollHeight}px`; // Adjust height based on content
        }
    });
}

// Adjust Textarea Height Dynamically
messageBar.addEventListener("input", function () {
    this.style.height = "auto"; // Reset height to auto
    this.style.height = `${this.scrollHeight}px`; // Set height based on scroll height
});

// Handle Dynamic Text Direction
document.querySelectorAll('.mughader_dynamic_direction_input_class').forEach(input => {
    input.addEventListener('input', function () {
        let firstChar = this.value.trim().charAt(0);

        if (firstChar) {
            // Check if the first character is Arabic
            if (firstChar.match(/[\u0600-\u06FF]/)) {
                this.style.direction = 'rtl';
            } else {
                this.style.direction = 'ltr';
            }
        }
    });
});











messageBar.addEventListener("input", function () {
    this.style.height = "auto"; // Reset height to auto
    this.style.height = `${this.scrollHeight}px`; // Set height based on scroll height
});

















scrollToWhoAreWe = function (elementIdName) {
    const targetDiv = document.getElementById(elementIdName);
    if (targetDiv) {
        const targetPosition = targetDiv.getBoundingClientRect().top + window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollToPosition = targetPosition - (windowHeight / 2) + (targetDiv.clientHeight / 2);

        window.scrollTo({
            top: scrollToPosition,
            behavior: "smooth"
        });
    }

}


/* Header show or hide based on scrolling */
const header = document.getElementById('mughader_header');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > lastScrollPosition) {
        // Scrolling down
        header.classList.add('hidden');
    } else {
        // Scrolling up
        header.classList.remove('hidden');
    }

    lastScrollPosition = currentScrollPosition;
});












































// create all offers content functionality
const sectionData = [

    {
        title: 'عروض طرابزون',
        main_image_1: {
            mainSrc: 'عروض-شركة-الشمال/عروض-طرابزون-1/عرض-طرابزون-1.jpg',
            subImages: [
                'عروض-شركة-الشمال/عروض-طرابزون-1/عرض-طرابزون-1-تفاصيل-1.jpg',
                'عروض-شركة-الشمال/عروض-طرابزون-1/عرض-طرابزون-1-تفاصيل-2.jpg',
                'عروض-شركة-الشمال/عروض-طرابزون-1/عرض-طرابزون-1-تفاصيل-3.jpg',
                'عروض-شركة-الشمال/عروض-طرابزون-1/عرض-طرابزون-1-تفاصيل-4.jpg',
                'عروض-شركة-الشمال/عروض-طرابزون-1/عرض-طرابزون-1-تفاصيل-5.jpg',
            ],
            text: 'عرض طرابزون - 8 أيام',
        },

        main_image_2: {
            mainSrc: 'عروض-شركة-الشمال/عروض-طرابزون-2/عرض-طرابزون-2.jpg',
            subImages: [
                'عروض-شركة-الشمال/عروض-طرابزون-2/عرض-طرابزون-2-تفاصيل-1.jpg',
                'عروض-شركة-الشمال/عروض-طرابزون-2/عرض-طرابزون-2-تفاصيل-2.jpg',
                'عروض-شركة-الشمال/عروض-طرابزون-2/عرض-طرابزون-2-تفاصيل-3.jpg',
                'عروض-شركة-الشمال/عروض-طرابزون-2/عرض-طرابزون-2-تفاصيل-4.jpg',
                'عروض-شركة-الشمال/عروض-طرابزون-2/عرض-طرابزون-2-تفاصيل-5.jpg',
            ],
            text: 'عرض طرابزون & باتومي - 8 أيام',
        },

        main_image_3: {
            mainSrc: 'عروض-شركة-الشمال/عروض-طرابزون-3/عرض-طرابزون-3.jpg',
            subImages: [
                'عروض-شركة-الشمال/عروض-طرابزون-3/عرض-طرابزون-3-تفاصيل-1.jpg',
                'عروض-شركة-الشمال/عروض-طرابزون-3/عرض-طرابزون-3-تفاصيل-2.jpg',
                'عروض-شركة-الشمال/عروض-طرابزون-3/عرض-طرابزون-3-تفاصيل-3.jpg',
                'عروض-شركة-الشمال/عروض-طرابزون-3/عرض-طرابزون-3-تفاصيل-4.jpg',
                'عروض-شركة-الشمال/عروض-طرابزون-3/عرض-طرابزون-3-تفاصيل-5.jpg',
            ],
            text: 'عرض طرابزون & ريزا - 8 أيام',
        },
    },

    {
        title: 'عروض موسكو',
        main_image_1: {
            mainSrc: 'عروض-شركة-الشمال/عروض-موسكو-1/عرض-موسكو-1.jpg',
            subImages: [
                'عروض-شركة-الشمال/عروض-موسكو-1/عرض-موسكو-1-تفاصيل-1.jpg',
                'عروض-شركة-الشمال/عروض-موسكو-1/عرض-موسكو-1-تفاصيل-2.jpg',
                'عروض-شركة-الشمال/عروض-موسكو-1/عرض-موسكو-1-تفاصيل-3.jpg',
                'عروض-شركة-الشمال/عروض-موسكو-1/عرض-موسكو-1-تفاصيل-4.jpg',
            ],
            text: 'عرض موسكو - 8 أيام',
        },

        main_image_2: {
            mainSrc: 'عروض-شركة-الشمال/عروض-موسكو-2/عرض-موسكو-2.jpg',
            subImages: [
                'عروض-شركة-الشمال/عروض-موسكو-2/عرض-موسكو-2-تفاصيل-1.jpg',
                'عروض-شركة-الشمال/عروض-موسكو-2/عرض-موسكو-2-تفاصيل-2.jpg',
                'عروض-شركة-الشمال/عروض-موسكو-2/عرض-موسكو-2-تفاصيل-3.jpg',
                'عروض-شركة-الشمال/عروض-موسكو-2/عرض-موسكو-2-تفاصيل-4.jpg',
                'عروض-شركة-الشمال/عروض-موسكو-2/عرض-موسكو-2-تفاصيل-5.jpg',
            ],
            text: 'عرض موسكو - 8 أيام',
        },

        main_image_3: {
            mainSrc: 'عروض-شركة-الشمال/عروض-موسكو-3/عرض-موسكو-3.jpg',
            subImages: [
                'عروض-شركة-الشمال/عروض-موسكو-3/عرض-موسكو-3-تفاصيل-1.jpg',
                'عروض-شركة-الشمال/عروض-موسكو-3/عرض-موسكو-3-تفاصيل-2.jpg',
                'عروض-شركة-الشمال/عروض-موسكو-3/عرض-موسكو-3-تفاصيل-3.jpg',
                'عروض-شركة-الشمال/عروض-موسكو-3/عرض-موسكو-3-تفاصيل-4.jpg',
            ],
            text: 'عرض موسكو - 8 أيام',
        },
    },

    {
        title: 'عروض اسطنبول',
        main_image_1: {
            mainSrc: 'عروض-شركة-الشمال/عروض-اسطنبول-1/عرض-اسطنبول-1.jpg',
            subImages: [
                'عروض-شركة-الشمال/عروض-اسطنبول-1/عرض-اسطنبول-1-تفاصيل-1.jpg',
                'عروض-شركة-الشمال/عروض-اسطنبول-1/عرض-اسطنبول-1-تفاصيل-2.jpg',
                'عروض-شركة-الشمال/عروض-اسطنبول-1/عرض-اسطنبول-1-تفاصيل-3.jpg',
            ],
            text: 'عرض اسطنبول & لندن - 8 أيام',
        },
    },

    {
        title: 'عروض كازخستان',
        main_image_1: {
            mainSrc: 'عروض-شركة-الشمال/عروض-كازخستان-1/عرض-كازخستان-1.jpg',
            subImages: [
                'عروض-شركة-الشمال/عروض-كازخستان-1/عرض-كازخستان-1-تفاصيل-1.jpg',
                'عروض-شركة-الشمال/عروض-كازخستان-1/عرض-كازخستان-1-تفاصيل-2.jpg',
                'عروض-شركة-الشمال/عروض-كازخستان-1/عرض-كازخستان-1-تفاصيل-3.jpg',
                'عروض-شركة-الشمال/عروض-كازخستان-1/عرض-كازخستان-1-تفاصيل-4.jpg',
            ],
            text: 'عرض كازخستان - 9 أيام',
        },
    },

    {
        title: 'عروض اذربيجان',
        main_image_1: {
            mainSrc: 'عروض-شركة-الشمال/عروض-اذربيجان-1/عرض-اذربيجان-1.jpg',
            subImages: [
                'عروض-شركة-الشمال/عروض-اذربيجان-1/عرض-اذربيجان-1-تفاصيل-1.jpg',
                'عروض-شركة-الشمال/عروض-اذربيجان-1/عرض-اذربيجان-1-تفاصيل-2.jpg',
                'عروض-شركة-الشمال/عروض-اذربيجان-1/عرض-اذربيجان-1-تفاصيل-3.jpg',
                'عروض-شركة-الشمال/عروض-اذربيجان-1/عرض-اذربيجان-1-تفاصيل-4.jpg',
                'عروض-شركة-الشمال/عروض-اذربيجان-1/عرض-اذربيجان-1-تفاصيل-5.jpg',
            ],
            text: 'عرض اذربيجان - 7 أيام',
        },
    },
];

// Function to dynamically create the section
function createScrollableCardsSection(dataArray) {
    const section = document.getElementById("scrollable_cards_section_id");

    dataArray.forEach((data) => {
        const container = document.createElement('div');
        container.className = 'scrollable_cards_container';

        // Create the title
        const title = document.createElement('h2');
        title.className = 'scrollable_section_title';
        title.innerText = data.title;
        container.appendChild(title);

        // Create the scrollable row
        const scrollableRow = document.createElement('div');
        scrollableRow.className = 'scrollable_cards_row';

        // Loop through the images and create cards
        Object.keys(data).forEach((key) => {
            if (key.startsWith('main_image')) {
                const { mainSrc, subImages, text } = data[key];

                const card = document.createElement('div');
                card.className = 'scrollable_card';

                const img = document.createElement('img');
                img.src = mainSrc; // Display the main image as the thumbnail
                img.alt = text;
                img.addEventListener('click', () => openFullScreenImage(mainSrc, subImages, text)); // Pass mainSrc and subImages
                card.appendChild(img);

                scrollableRow.appendChild(card);
            }
        });

        container.appendChild(scrollableRow);
        section.appendChild(container);
    });
}

function openFullScreenImage(mainSrc, subImages, text) {
    // Disable document scrolling
    document.body.style.overflow = 'hidden';

    // Create the full-screen container div
    const fullScreenDiv = document.createElement('div');
    fullScreenDiv.className = 'full_screen_container';

    // Add animation class for fade-in effect
    setTimeout(() => fullScreenDiv.classList.add('visible'), 10);

    // Create the exit button
    const exitButton = document.createElement('button');
    exitButton.innerText = 'عودة';
    exitButton.className = 'exit_button';
    exitButton.addEventListener('click', closeFullScreenImage);
    fullScreenDiv.appendChild(exitButton);

    // Create the title
    const title = document.createElement('h2');
    title.innerText = text;
    title.className = 'full_screen_title';
    fullScreenDiv.appendChild(title);

    // Create the scrollable images container
    const imagesContainer = document.createElement('div');
    imagesContainer.className = 'scrollable_images_container';

    // Add mainSrc as the first image
    const mainImage = document.createElement('img');
    mainImage.src = mainSrc;
    mainImage.className = 'scrollable_image';
    imagesContainer.appendChild(mainImage);

    // Add subImages
    subImages.forEach((subSrc) => {
        const subImg = document.createElement('img');
        subImg.src = subSrc;
        subImg.className = 'scrollable_image';
        imagesContainer.appendChild(subImg);
    });

    fullScreenDiv.appendChild(imagesContainer);

    // Create the WhatsApp button
    const whatsappButton = document.createElement('a');
    whatsappButton.className = 'whatsapp_button';
    whatsappButton.innerText = 'إرسال هذا العرض';
    whatsappButton.href = `https://wa.me/+97317900988?text=طلب%20حجز%20هذا%20العرض:%0A%0Ahttps://mohammed-website.github.io/sikkatravel/${encodeURIComponent(mainSrc)}`;
    fullScreenDiv.appendChild(whatsappButton);

    // Close on background click
    fullScreenDiv.addEventListener('click', (e) => {
        if (e.target === fullScreenDiv) closeFullScreenImage();
    });

    document.body.appendChild(fullScreenDiv);

    // Smooth close function
    function closeFullScreenImage() {
        fullScreenDiv.classList.remove('visible'); // Trigger fade-out
        setTimeout(() => fullScreenDiv.remove(), 300); // Remove element after fade-out
        document.body.style.overflow = ''; // Re-enable document scrolling
    }
}


// Call the function with the sample data
createScrollableCardsSection(sectionData);
































/* Function for import all comments from google sheet */
document.getElementById("indoforall_comment_form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page refresh

    let name = document.getElementById("indoforall_comment_username").value.trim();
    let comment = document.getElementById("indoforall_comment_text").value.trim();
    let stars = document.getElementById("indoforall_comment_stars").value;


    let formData = new URLSearchParams();
    formData.append("name", name); // Match Google Apps Script keys
    formData.append("comment", comment);
    formData.append("stars", stars);

    try {
        let response = await fetch("https://script.google.com/macros/s/AKfycbyBAJQhhVA5Uhxe2rrEZ4rjB0Ttn4SrYBptwjx47VZlxtgi3dENPfmNyAmrfL-QZpdEnQ/exec", {
            method: "POST",
            body: formData,
        });

        let data = await response.text();

        if (data === "Success") {
            document.getElementById("indoforall_comment_form").reset();

            await fetchReviews(); // Wait until fetchReviews() is fully executed

            showSuccessNotification(); // Now run the notification function
        }
    } catch (error) {
    }
});

// Function to Fetch and Display Reviews
function fetchReviews() {
    fetch("https://script.google.com/macros/s/AKfycbyBAJQhhVA5Uhxe2rrEZ4rjB0Ttn4SrYBptwjx47VZlxtgi3dENPfmNyAmrfL-QZpdEnQ/exec")
        .then(response => response.json())
        .then(data => {
            let indoforall_clint_rate_area = document.getElementById("indoforall_clint_rate_area");
            indoforall_clint_rate_area.innerHTML = ""; // Clear old reviews

            data.reverse().forEach(item => { // Reverse to show newest first
                let { date, name, comment, starAmount } = item;

                // Skip any row where the comment is empty
                if (!comment.trim()) return;

                let clintRateDiv = document.createElement("div");
                clintRateDiv.classList.add("indoforall_rate_div");

                clintRateDiv.innerHTML = `
                <div class="indoforall_clint_rate_date_div indoforall_animate_on_scroll">
                    <h3 class="indoforall_animate_on_scroll">${date}</h3>
                </div>

                <div class="indoforall_clint_rate_info_div indoforall_animate_on_scroll">
                    <img src="مكتب-سياحي/مكتب-سياحي-بحريني.webp" alt="سهم للسفر والسياحة - مكتب سياحي" title="سهم للسفر والسياحة - مكتب سياحي">
                    <h4>${name}</h4>
                </div>

                <div class="indoforall_clint_rate_comment_div">
                    <h5>${comment}</h5>
                </div>

                <div class="indoforall_clint_rate_star_div">
                    ${"★".repeat(starAmount)}
                </div>
            `;

                indoforall_clint_rate_area.appendChild(clintRateDiv);
            });

            // Smooth appearance with delay
            setTimeout(() => {
                indoforall_clint_rate_area.classList.add("show");
            }, 100);
        })
        .catch(error => console.error("Error fetching reviews:", error));
}

// Function to Show Floating Success Notification
function showSuccessNotification() {
    let notification = document.getElementById("indoforall_success_notification");
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.opacity = "1";
        notification.style.transform = "translateX(-50%) translateY(0px)"; // Move slightly up
    }, 10);

    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateX(-50%) translateY(10px)"; // Move down slightly while fading out
        setTimeout(() => {
            notification.style.display = "none";
        }, 400);
    }, 3000);
}

// Fetch Reviews on Page Load
fetchReviews();


















/* Function to trach the first inserted letter in the inputs with the class name of "mughader_dynamic_direction_input_class" to set their direction value */
document.querySelectorAll('.mughader_dynamic_direction_input_class').forEach(input => {
    input.addEventListener('input', function () {
        let firstChar = this.value.trim().charAt(0);

        if (firstChar) {
            // Check if the first character is Arabic
            if (firstChar.match(/[\u0600-\u06FF]/)) {
                this.style.direction = 'rtl';
            } else {
                this.style.direction = 'ltr';
            }
        }
    });
});



/* Insert new click data in the google sheet */
function insertNewClick(columnName) {
    const scriptURL = "https://script.google.com/macros/s/AKfycbyU-p7z3tHF0I1K0GCmjcRG3CaG0NPkGyMPTvhlGPISxwIYrt6ueD7O2iHSza9SPOP3/exec";

    // Trim the column name before passing it
    fetch(`${scriptURL}?columnName=${encodeURIComponent(columnName.trim())}`)
        .then(response => response.text())
        .then(data => console.log("Response:", data))
        .catch(error => console.error("Error:", error));
}

/* Open WhatsApp */
openWhatsAppNumber = function () {

    insertNewClick('alseef.com');

    const whatsappNumber = "+97317900988";
    const message = encodeURIComponent('سلام عليكم ورحمة الله وبركاته'); // Optional pre-filled message
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank"); // Opens in a new tab
}