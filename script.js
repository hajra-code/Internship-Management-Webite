/* =====================================================
   INTERNFLOW - MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageId) {

    // Get all main pages
    const pages = document.querySelectorAll(".page");

    // Hide every page
    pages.forEach(function (page) {

        page.classList.add("hidden");

    });


    // Find the page that should be shown
    const selectedPage = document.getElementById(pageId);


    if (selectedPage) {

        // Show selected page
        selectedPage.classList.remove("hidden");


        // Scroll to the top of the selected page
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}


/* =====================================================
   HOME PAGE
===================================================== */

function goToHome() {

    showPage("landingPage");

}


/* =====================================================
   REGISTRATION PAGE
===================================================== */

function goToRegister() {

    // Hide the login page and show registration page
    showPage("registerPage");


    // Clear login form if it exists
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.reset();

    }

}


/* =====================================================
   LOGIN PAGE
===================================================== */

function goToLogin() {

    // Hide the registration page and show login page
    showPage("loginPage");


    // Clear registration form if it exists
    const registerForm =
        document.getElementById("registerForm");

    if (registerForm) {

        registerForm.reset();

    }

}


/* =====================================================
   USER REGISTRATION
===================================================== */

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        // Stop the page from refreshing
        event.preventDefault();


        // Get user information
        const name =
            document.getElementById("registerName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;


        // Check that all fields are filled
        if (!name || !email || !password) {

            alert("Please fill in all fields.");

            return;

        }


        // Create a user object
        const user = {

            name: name,

            email: email,

            password: password

        };


        // Save user information in browser storage
        localStorage.setItem(
            "internFlowUser",
            JSON.stringify(user)
        );


        // Show success message
        alert(
            "🎉 Account created successfully!\n\n" +
            "You can now log in to your InternFlow account."
        );


        // Clear the form
        registerForm.reset();


        // Open login page
        showPage("loginPage");


        // Automatically fill the email
        document.getElementById("loginEmail").value = email;

    });

}


/* =====================================================
   USER LOGIN
===================================================== */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        // Stop page refresh
        event.preventDefault();


        // Get login details
        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        // Get registered user
        const savedUser =
            localStorage.getItem("internFlowUser");


        // If no account exists
        if (!savedUser) {

            alert(
                "No account found.\n\n" +
                "Please create an account first."
            );

            return;

        }


        // Convert saved text into an object
        const user =
            JSON.parse(savedUser);


        // Check login details
        if (
            email === user.email &&
            password === user.password
        ) {


            // Save current login status
            localStorage.setItem(
                "internFlowLoggedIn",
                "true"
            );


            // Update dashboard name
            const userName =
                document.querySelector(".user-name");


            if (userName) {

                userName.textContent =
                    user.name;

            }


            // Update date
            displayCurrentDate();


            // Show success message
            alert(
                "✅ Login successful!\n\n" +
                "Welcome to InternFlow, " +
                user.name + "!"
            );


            // Show dashboard
            showPage("dashboardPage");


            // Show overview section
            showDashboardSection("overviewSection");

        }


        else {

            alert(
                "❌ Incorrect email or password.\n\n" +
                "Please try again."
            );

        }

    });

}


/* =====================================================
   DASHBOARD NAVIGATION
===================================================== */

function showDashboardSection(sectionId) {

    // Get all dashboard sections
    const sections =
        document.querySelectorAll(".dashboard-section");


    // Hide all dashboard sections
    sections.forEach(function (section) {

        section.classList.add("hidden");

    });


    // Show selected dashboard section
    const selectedSection =
        document.getElementById(sectionId);


    if (selectedSection) {

        selectedSection.classList.remove("hidden");

    }


    // Update active sidebar link
    const sidebarLinks =
        document.querySelectorAll(".sidebar-link");


    sidebarLinks.forEach(function (link) {

        link.classList.remove("active");

    });


    // Find matching navigation link
    sidebarLinks.forEach(function (link) {

        const onclickValue =
            link.getAttribute("onclick");


        if (
            onclickValue &&
            onclickValue.includes(sectionId)
        ) {

            link.classList.add("active");

        }

    });


    // Scroll dashboard to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    // Remove login status
    localStorage.removeItem(
        "internFlowLoggedIn"
    );


    // Clear login form
    if (loginForm) {

        loginForm.reset();

    }


    // Show confirmation
    alert(
        "You have been logged out successfully."
    );


    // Return to home page
    goToHome();

}


/* =====================================================
   CURRENT DATE
===================================================== */

function displayCurrentDate() {

    const dateDisplay =
        document.querySelector(".date-display");


    if (!dateDisplay) {

        return;

    }


    const today =
        new Date();


    const options = {

        weekday: "long",

        year: "numeric",

        month: "long",

        day: "numeric"

    };


    dateDisplay.textContent =
        today.toLocaleDateString(
            "en-US",
            options
        );

}


/* =====================================================
   TASK FILTERING
===================================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");


const taskCards =
    document.querySelectorAll(".task-card");


filterButtons.forEach(function (button) {


    button.addEventListener("click", function () {


        // Remove active class from every button
        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        // Make clicked button active
        button.classList.add("active");


        // Get selected filter
        const filter =
            button.getAttribute("data-filter");


        // Show or hide tasks
        taskCards.forEach(function (task) {


            const status =
                task.getAttribute("data-status");


            if (
                filter === "all" ||
                filter === status
            ) {

                task.classList.remove("hidden");

            }

            else {

                task.classList.add("hidden");

            }

        });

    });

});


/* =====================================================
   PROJECT SUBMISSION
===================================================== */

const submissionForm =
    document.getElementById("submissionForm");


if (submissionForm) {


    submissionForm.addEventListener(
        "submit",
        function (event) {


            // Stop page refresh
            event.preventDefault();


            // Get form values
            const task =
                document.getElementById(
                    "submissionTask"
                ).value.trim();


            const project =
                document.getElementById(
                    "submissionProject"
                ).value.trim();


            const description =
                document.getElementById(
                    "submissionDescription"
                ).value.trim();


            // Check fields
            if (
                !task ||
                !project ||
                !description
            ) {

                alert(
                    "Please fill in all fields."
                );

                return;

            }


            // Create submission object
            const submission = {

                task: task,

                project: project,

                description: description,

                date: new Date()
                    .toLocaleDateString(
                        "en-US"
                    ),

                status: "Pending"

            };


            // Get old submissions
            let submissions =
                JSON.parse(
                    localStorage.getItem(
                        "internFlowSubmissions"
                    )
                ) || [];


            // Add new submission
            submissions.push(submission);


            // Save submissions
            localStorage.setItem(

                "internFlowSubmissions",

                JSON.stringify(submissions)

            );


            // Show success message
            alert(
                "🎉 Project submitted successfully!"
            );


            // Clear form
            submissionForm.reset();


            // Display submissions
            displaySubmissions();

        });

}


/* =====================================================
   DISPLAY PROJECT SUBMISSIONS
===================================================== */

function displaySubmissions() {


    const container =
        document.getElementById(
            "submissionsContainer"
        );


    if (!container) {

        return;

    }


    // Get saved submissions
    const submissions =
        JSON.parse(
            localStorage.getItem(
                "internFlowSubmissions"
            )
        ) || [];


    // Clear existing content
    container.innerHTML = "";


    // If there are no submissions
    if (submissions.length === 0) {

        container.innerHTML = `

            <div class="dashboard-card">

                <p style="color: #64748b; font-size: 12px;">

                    No projects submitted yet.

                </p>

            </div>

        `;

        return;

    }


    // Display every submission
    submissions.forEach(function (submission) {


        const submissionElement =
            document.createElement("div");


        submissionElement.className =
            "submission-item";


        submissionElement.innerHTML = `

            <div>

                <h3>
                    ${submission.project}
                </h3>

                <p>
                    ${submission.description}
                </p>

                <small>

                    Task:
                    ${submission.task}

                    • Submitted:
                    ${submission.date}

                </small>

            </div>


            <span class="status-badge pending">

                ${submission.status}

            </span>

        `;


        container.appendChild(
            submissionElement
        );

    });

}


/* =====================================================
   MOBILE SIDEBAR
===================================================== */

const mobileMenuButtons =
    document.querySelectorAll(
        ".mobile-menu-btn"
    );


const sidebar =
    document.querySelector(".sidebar");


mobileMenuButtons.forEach(function (button) {


    button.addEventListener(
        "click",
        function () {


            if (sidebar) {

                sidebar.classList.toggle(
                    "open"
                );

            }

        }

    );

});


/* =====================================================
   NAVIGATION LINK BEHAVIOUR
===================================================== */

document.querySelectorAll(
    '.nav-links a[href^="#"]'
).forEach(function (link) {


    link.addEventListener(
        "click",
        function (event) {


            const targetId =
                link.getAttribute("href");


            const target =
                document.querySelector(
                    targetId
                );


            if (target) {

                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        }

    );

});


/* =====================================================
   INITIAL SETUP
===================================================== */

// Display saved submissions
displaySubmissions();


// Display current date
displayCurrentDate();


// Make sure homepage is shown when website opens
showPage("landingPage");