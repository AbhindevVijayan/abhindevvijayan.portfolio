document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Custom Cursor tracking
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');
    
    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        registerCursorHover(document.querySelectorAll('a, button, select, input, textarea'));
    }

    function registerCursorHover(elements) {
        if (!cursor) return;
        elements.forEach(item => {
            item.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            item.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    }

    // ==========================================================================
    // State Variables & Elements
    // ==========================================================================
    let projectsList = [];

    const adminProjectsGrid = document.getElementById('adminProjectsGrid');
    const adminAddProjectBtn = document.getElementById('adminAddProjectBtn');
    const adminPublishBtn = document.getElementById('adminPublishBtn');
    const adminProjectModal = document.getElementById('adminProjectModal');
    const closeAdminProjectModal = document.getElementById('closeAdminProjectModal');
    const adminProjectForm = document.getElementById('adminProjectForm');
    const pSubmitText = document.getElementById('pSubmitText');
    const pModalTitle = document.getElementById('pModalTitle');
    const pIdInput = document.getElementById('pId');
    const toast = document.getElementById('notificationToast');

    // ==========================================================================
    // Fetch and Render Database
    // ==========================================================================
    async function fetchProjects() {
        try {
            const response = await fetch('assets/projects.json?' + Date.now()); // Prevent cache
            projectsList = await response.json();
            renderAdminGrid();
        } catch (error) {
            console.error("Error fetching projects from backend:", error);
            showToast("Failed to connect to backend database.", true);
        }
    }

    function renderAdminGrid() {
        if (!adminProjectsGrid) return;
        adminProjectsGrid.innerHTML = '';

        if (projectsList.length === 0) {
            adminProjectsGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1;">
                    <p>No projects found in the backend JSON database. Click "Add Project" to add your first real project!</p>
                </div>
            `;
            return;
        }

        projectsList.forEach(project => {
            const tagsHTML = project.tags.map(t => `<span>${escapeHTML(t.trim())}</span>`).join('');
            
            let linksHTML = '';
            if (project.sourceUrl) {
                linksHTML += `<a href="${escapeHTML(project.sourceUrl)}" target="_blank" class="project-link"><i data-lucide="github"></i><span>Source</span></a>`;
            }
            if (project.liveUrl) {
                linksHTML += `<a href="${escapeHTML(project.liveUrl)}" target="_blank" class="project-link"><i data-lucide="external-link"></i><span>Live Demo</span></a>`;
            }

            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-media">
                    <div class="project-glow"></div>
                    <div class="project-accent-icon"><i data-lucide="${escapeHTML(project.icon)}"></i></div>
                    <span class="project-category">${escapeHTML(project.category)}</span>
                    <div class="project-card-actions">
                        <button class="action-btn action-edit" title="Edit Project" onclick="editAdminProject('${project.id}')"><i data-lucide="pencil"></i></button>
                        <button class="action-btn action-delete" title="Delete Project" onclick="deleteAdminProject('${project.id}')"><i data-lucide="trash-2"></i></button>
                    </div>
                </div>
                <div class="project-info">
                    <h3>${escapeHTML(project.title)}</h3>
                    <p>${escapeHTML(project.description)}</p>
                    <div class="project-tags">
                        ${tagsHTML}
                    </div>
                    <div class="project-links">
                        ${linksHTML}
                    </div>
                </div>
            `;
            adminProjectsGrid.appendChild(projectCard);
        });

        // Re-render Lucide icons
        lucide.createIcons();

        // Register custom cursor hover
        registerCursorHover(adminProjectsGrid.querySelectorAll('.project-link, .action-btn'));
    }

    // ==========================================================================
    // Project Modal Form Handlers
    // ==========================================================================
    if (adminAddProjectBtn) {
        adminAddProjectBtn.addEventListener('click', () => {
            adminProjectForm.reset();
            pIdInput.value = '';
            pModalTitle.textContent = "Add Real Project";
            pSubmitText.textContent = "Save to Memory";
            
            adminProjectForm.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));
            
            adminProjectModal.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeAdminProjectModal) {
        closeAdminProjectModal.addEventListener('click', closeAdminModal);
    }

    adminProjectModal.addEventListener('click', (e) => {
        if (e.target === adminProjectModal) {
            closeAdminModal();
        }
    });

    function closeAdminModal() {
        adminProjectModal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Form Submission (Memory Write)
    if (adminProjectForm) {
        adminProjectForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const titleIn = document.getElementById('pTitle');
            const categoryIn = document.getElementById('pCategory');
            const iconIn = document.getElementById('pIcon');
            const tagsIn = document.getElementById('pTags');
            const sourceIn = document.getElementById('pSourceUrl');
            const liveIn = document.getElementById('pLiveUrl');
            const descIn = document.getElementById('pDescription');
            const idVal = pIdInput.value;

            let isValid = true;

            adminProjectForm.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));

            if (!titleIn.value.trim()) {
                titleIn.parentNode.classList.add('has-error');
                isValid = false;
            }
            if (!categoryIn.value) {
                categoryIn.parentNode.classList.add('has-error');
                isValid = false;
            }
            if (!iconIn.value) {
                iconIn.parentNode.classList.add('has-error');
                isValid = false;
            }
            if (!tagsIn.value.trim()) {
                tagsIn.parentNode.classList.add('has-error');
                isValid = false;
            }
            if (!descIn.value.trim()) {
                descIn.parentNode.classList.add('has-error');
                isValid = false;
            }

            if (!isValid) return;

            const tagsArr = tagsIn.value.split(',').map(t => t.trim()).filter(t => t.length > 0);

            if (idVal) {
                // Edit existing in memory
                const index = projectsList.findIndex(p => p.id === idVal);
                if (index !== -1) {
                    projectsList[index] = {
                        id: idVal,
                        title: titleIn.value.trim(),
                        category: categoryIn.value,
                        icon: iconIn.value,
                        tags: tagsArr,
                        sourceUrl: sourceIn.value.trim(),
                        liveUrl: liveIn.value.trim(),
                        description: descIn.value.trim()
                    };
                }
            } else {
                // Add new to memory
                const newProject = {
                    id: "p_" + Date.now(),
                    title: titleIn.value.trim(),
                    category: categoryIn.value,
                    icon: iconIn.value,
                    tags: tagsArr,
                    sourceUrl: sourceIn.value.trim(),
                    liveUrl: liveIn.value.trim(),
                    description: descIn.value.trim()
                };
                projectsList.unshift(newProject);
            }

            renderAdminGrid();
            closeAdminModal();
            showToast("Project updated in local workspace memory. Click 'Save & Publish' to write permanently.", false);
        });
    }

    // ==========================================================================
    // Save to Server Filesystem (POST backend API)
    // ==========================================================================
    if (adminPublishBtn) {
        adminPublishBtn.addEventListener('click', async () => {
            adminPublishBtn.querySelector('span').textContent = 'Saving to Server...';
            adminPublishBtn.setAttribute('disabled', 'true');
            
            try {
                const response = await fetch('/api/projects', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(projectsList)
                });
                
                const result = await response.json();
                
                if (response.ok && result.status === 'success') {
                    showToast("Database saved permanently and published live!", false);
                } else {
                    throw new Error(result.message || "Failed to save.");
                }
            } catch (error) {
                console.error("Error saving projects to filesystem backend:", error);
                showToast("Server Connection Failed. Make sure backend runs on port 8080.", true);
            } finally {
                adminPublishBtn.querySelector('span').textContent = 'Save & Publish changes';
                adminPublishBtn.removeAttribute('disabled');
            }
        });
    }

    // ==========================================================================
    // Global Hooks for Dynamic Card Buttons
    // ==========================================================================
    window.editAdminProject = function(id) {
        const project = projectsList.find(p => p.id === id);
        if (!project) return;

        adminProjectForm.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));

        pIdInput.value = project.id;
        document.getElementById('pTitle').value = project.title;
        document.getElementById('pCategory').value = project.category;
        document.getElementById('pIcon').value = project.icon;
        document.getElementById('pTags').value = project.tags.join(', ');
        document.getElementById('pSourceUrl').value = project.sourceUrl || '';
        document.getElementById('pLiveUrl').value = project.liveUrl || '';
        document.getElementById('pDescription').value = project.description;

        pModalTitle.textContent = "Edit Project Settings";
        pSubmitText.textContent = "Save to Memory";

        adminProjectModal.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    window.deleteAdminProject = function(id) {
        if (confirm("Remove this project from your workspace memory? (You will need to click 'Save & Publish' to save this deletion on the server).")) {
            projectsList = projectsList.filter(p => p.id !== id);
            renderAdminGrid();
            showToast("Project deleted from memory. Click 'Save & Publish' to save.", false);
        }
    };

    // ==========================================================================
    // Notifications & Utilities
    // ==========================================================================
    function showToast(message, isError = false) {
        if (!toast) return;
        const toastMsg = document.getElementById('toastMsg');
        
        toastMsg.textContent = message;
        
        // Reset styles
        toast.className = 'notification-toast';
        
        if (isError) {
            toast.classList.add('error');
            toast.querySelector('i').setAttribute('data-lucide', 'alert-circle');
        } else {
            toast.querySelector('i').setAttribute('data-lucide', 'check-circle');
        }
        
        lucide.createIcons();
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    // Trigger Initial Load
    fetchProjects();
});
