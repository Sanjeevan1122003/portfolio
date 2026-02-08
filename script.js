        // Display function
        function display(sectionId) {
            const sections = ['sectionHome', 'sectionAboutMe', 'sectionSkills', , 'sectionCertificates', 'sectionProjects', 'sectionContactMe'];
            const buttons = {
                'sectionHome': 'homeBtn',
                'sectionAboutMe': 'aboutMeBtn',
                'sectionSkills': 'skillsBtn',
                'sectionCertificates': 'certificatesBtn',
                'sectionProjects': 'projectsBtn',
                'sectionContactMe': 'contactMeBtn'
            };

            // Remove 'onpage' class from all buttons
            Object.values(buttons).forEach(buttonId => {
                document.getElementById(buttonId).classList.remove('onpage');
            });

            sections.forEach(section => {
                const element = document.getElementById(section);
                element.style.display = 'none';
                element.classList.remove('show');  // Remove 'show' class from all sections

                // Specific class removal for Home section
                if (section === 'sectionHome') {
                    document.getElementById("nameContainer").classList.remove("slide");
                    document.getElementById("profileImageContainer").classList.remove("slide");
                }
            });

            const selectedSection = document.getElementById(sectionId);
            selectedSection.style.display = 'block';

            // Add 'show' class to the selected section after delay
            setTimeout(function () {
                selectedSection.classList.add("show");

                // Specific class addition for Home section
                if (sectionId === 'sectionHome') {
                    document.getElementById("nameContainer").classList.add("slide");
                    document.getElementById("profileImageContainer").classList.add("slide");
                }
            }, 400);

            // Add 'onpage' class to the corresponding button immediately
            document.getElementById(buttons[sectionId]).classList.add('onpage');
        }

        // Initialize the Home section on page load
        window.onload = function () {
            display('sectionHome');
        };

        document.addEventListener('DOMContentLoaded', function () {
            const skillsSection = document.getElementById('sectionSkills');
            const progressBars = document.querySelectorAll('.prograsive-bar span');
            const resumeLinks = Array.from(document.querySelectorAll('a[download]'));
            const firstImage = document.querySelector('img');
            const resumeHrefs = resumeLinks.map(link => link.getAttribute('href'));
            // #region agent log
            fetch('http://127.0.0.1:7243/ingest/a574fb0c-5a69-44e3-b718-b670a434726c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'pre-fix',hypothesisId:'H1',location:'script.js:58',message:'DOMContentLoaded asset snapshot',data:{resumeLinkCount:resumeLinks.length,resumeHrefs,firstImageSrc:firstImage?firstImage.getAttribute('src'):null},timestamp:Date.now()})}).catch(()=>{});
            // #endregion

            if (resumeHrefs[0]) {
                // #region agent log
                fetch('http://127.0.0.1:7243/ingest/a574fb0c-5a69-44e3-b718-b670a434726c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'pre-fix',hypothesisId:'H2',location:'script.js:62',message:'Fetch resume href',data:{href:resumeHrefs[0]},timestamp:Date.now()})}).catch(()=>{});
                // #endregion
                fetch(resumeHrefs[0]).then(res => {
                    // #region agent log
                    fetch('http://127.0.0.1:7243/ingest/a574fb0c-5a69-44e3-b718-b670a434726c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'pre-fix',hypothesisId:'H2',location:'script.js:66',message:'Resume fetch result',data:{href:resumeHrefs[0],status:res.status,ok:res.ok},timestamp:Date.now()})}).catch(()=>{});
                    // #endregion
                }).catch(err => {
                    // #region agent log
                    fetch('http://127.0.0.1:7243/ingest/a574fb0c-5a69-44e3-b718-b670a434726c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'pre-fix',hypothesisId:'H2',location:'script.js:68',message:'Resume fetch error',data:{href:resumeHrefs[0],error:String(err)},timestamp:Date.now()})}).catch(()=>{});
                    // #endregion
                });
            }

            if (firstImage && firstImage.getAttribute('src')) {
                const imageSrc = firstImage.getAttribute('src');
                fetch(imageSrc).then(res => {
                    // #region agent log
                    fetch('http://127.0.0.1:7243/ingest/a574fb0c-5a69-44e3-b718-b670a434726c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'pre-fix',hypothesisId:'H2',location:'script.js:75',message:'First image fetch result',data:{src:imageSrc,status:res.status,ok:res.ok},timestamp:Date.now()})}).catch(()=>{});
                    // #endregion
                }).catch(err => {
                    // #region agent log
                    fetch('http://127.0.0.1:7243/ingest/a574fb0c-5a69-44e3-b718-b670a434726c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'pre-fix',hypothesisId:'H2',location:'script.js:77',message:'First image fetch error',data:{src:imageSrc,error:String(err)},timestamp:Date.now()})}).catch(()=>{});
                    // #endregion
                });
            }

            // Set up an intersection observer
            const observerOptions = {
                root: null, // viewport
                threshold: 0.2 // when 20% of the section is visible
            };

            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        progressBars.forEach(bar => {
                            // Check if the bar is already animated
                            if (!bar.classList.contains('animated')) {
                                // Add 'animated' class to mark as already animated
                                bar.classList.remove('animated');

                                // Animate the progress bar
                                const percentage = bar.getAttribute('data-percentage');
                                bar.style.width = percentage;
                            }
                        });
                    }
                });
            }, observerOptions);

            // Observe the skills section
            observer.observe(skillsSection);
        });


        // When the section is opened again, reset the widths and trigger the animation
        function display(sectionId) {
            const sections = ['sectionHome', 'sectionAboutMe', 'sectionSkills', 'sectionCertificates', 'sectionProjects', 'sectionContactMe'];
            const buttons = {
                'sectionHome': 'homeBtn',
                'sectionAboutMe': 'aboutMeBtn',
                'sectionSkills': 'skillsBtn',
                'sectionCertificates': 'certificatesBtn',
                'sectionProjects': 'projectsBtn',
                'sectionContactMe': 'contactMeBtn'
            };

            Object.values(buttons).forEach(buttonId => {
                document.getElementById(buttonId).classList.remove('onpage');
            });

            sections.forEach(section => {
                const element = document.getElementById(section);
                element.style.display = 'none';
                element.classList.remove('show');

                if (section === 'sectionHome') {
                    document.getElementById("nameContainer").classList.remove("slide");
                    document.getElementById("profileImageContainer").classList.remove("slide");
                }
            });

            const selectedSection = document.getElementById(sectionId);
            selectedSection.style.display = 'block';

            setTimeout(function () {
                selectedSection.classList.add("show");

                if (sectionId === 'sectionSkills') {
                    // Reset widths before adding the section to the view
                    progressBars.forEach(bar => bar.style.width = '0%');
                    setTimeout(() => {
                        progressBars.forEach(bar => {
                            const percentage = bar.getAttribute('data-percentage');
                            bar.style.width = percentage;
                        });
                    }, 100);
                }

                if (sectionId === 'sectionHome') {
                    document.getElementById("nameContainer").classList.add("slide");
                    document.getElementById("profileImageContainer").classList.add("slide");
                }
            }, 400);

            document.getElementById(buttons[sectionId]).classList.add('onpage');
        }

        window.onload = function () {
            display('sectionHome');
        };

        const openButtons = document.querySelectorAll('.open-btn');
        const views = document.querySelectorAll('.view');
        const overlay = document.getElementById('overlay');


        // Open the corresponding view when an open button is clicked
        openButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetViewId = button.getAttribute('data-view');
                const targetView = document.getElementById(targetViewId);
                targetView.style.display = 'flex';
                overlay.style.display = 'block'; // Show the overlay
            });
        });

        // Close the view when the close button inside the view is clicked
        views.forEach(view => {
            const closeButton = view.querySelector('.close-btn');
            closeButton.addEventListener('click', () => {
                view.style.display = 'none';
                overlay.style.display = 'none'; // Hide the overlay
            });
        });

        // Close the view if clicking outside the view (on the overlay)
        window.addEventListener('click', (event) => {
            if (event.target === overlay) {
                views.forEach(view => (view.style.display = 'none'));
                overlay.style.display = 'none'; // Hide the overlay
            }
        });

        window.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });

        window.addEventListener('copy', function (e) {
            e.preventDefault();
        });

        // #region agent log
        window.addEventListener('error', function (event) {
            fetch('http://127.0.0.1:7243/ingest/a574fb0c-5a69-44e3-b718-b670a434726c',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({runId:'pre-fix',hypothesisId:'H3',location:'script.js:185',message:'Window error event',data:{message:event.message,filename:event.filename,lineno:event.lineno,colno:event.colno},timestamp:Date.now()})}).catch(()=>{});
        });
        // #endregion
