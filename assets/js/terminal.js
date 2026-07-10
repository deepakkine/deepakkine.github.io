// ================================
// Interactive DevOps Terminal
// ================================

const terminalInput = document.getElementById("terminal-command");
const terminalOutput = document.getElementById("terminal-output");

// Command History
let commandHistory = [];
let historyIndex = -1;
let currentDirectory = "~";

window.addEventListener("DOMContentLoaded", () => {

    const terminal = document.querySelector(".terminal-window");

    if (!terminal || !terminalInput) return;

    setTimeout(() => {
        terminalInput.focus();
    }, 100);

    terminal.addEventListener("click", () => {
        terminalInput.focus();
    });

});

const commands = {

    help: `
Available Commands

about
whoami
skills
projects
experience
resume
download
github
linkedin
contact
clear
`,

    about: `
Hi 👋

I'm Dipak Kine.

DevOps Engineer passionate about
AWS, Kubernetes, Terraform,
Docker and CI/CD Automation.
`,

    whoami: `
Dipak Kine

DevOps Engineer
`,

    skills: `
AWS
Docker
Kubernetes
Terraform
GitHub Actions
Helm
Linux
Bash
Prometheus
Grafana
`,

    projects: `
Projects

1. AWS Infrastructure Automation using Terraform and Jenkins
    - Terraform, Jenkins, AWS, Docker, CI/CD

2. Kubernetes Three-Tier Application Deployment
    - Kubernetes, Docker, AWS EKS, Helm, Prometheus

3. AWS EKS GitOps Deployment using Terraform & ArgoCD
    - AWS EKS, Terraform, Kubernetes, ArgoCD, GitOps

4. Three-Tier Infrastructure Deployment using AWS + Terraform + Git + GitHub
     - AWS, Terraform, Git, GitHub, CI/CD, Infrastructure Automation

5. End-to-End DevOps Automation Platform on AWS EKS
    - AWS EKS, Terraform, Docker, Kubernetes, GitHub Actions, ArgoCD, Amazon ECR, Trivy,
       GitOps, CI/CD

6. Production-Ready AWS Three-Tier DevSecOps Platform with Monitoring and Alerting
    - AWS (EKS, EC2, IAM, VPC, ECR), Terraform, Docker, Kubernetes, Helm, GitHub Actions, GitHub OIDC,
      NGINX Ingress, AWS Load Balancer Controller, EBS CSI Driver, cert-manager, Let's Encrypt, Prometheus, 
      Grafana, Alertmanager, Trivy.
`,

    experience: `
Experience

DevOps Engineer

Cloud Infrastructure

CI/CD

Kubernetes

Terraform
`,

    contact: `
Email

kinedipak97@gmail.com

Phone

+91 72193 67609
`
};

const commandList = [
    "help",
    "about",
    "whoami",
    "skills",
    "projects",
    "experience",
    "resume",
    "preview",
    "download",
    "github",
    "linkedin",
    "contact",
    "ls",
    "pwd",
    "cd",
    "cat",
    "clear"
];

function typeOutput(text, isHTML = false) {

    const element = document.createElement(isHTML ? "div" : "pre");

    terminalOutput.appendChild(element);

    let index = 0;

    const interval = setInterval(() => {

        if (isHTML) {
            element.innerHTML = text.substring(0, index);
        } else {
            element.textContent = text.substring(0, index);
        }

        terminalOutput.scrollTop = terminalOutput.scrollHeight;

        index++;

        if (index > text.length) {
            clearInterval(interval);
        }

    }, 8);

}

terminalInput.addEventListener("keydown", function (e) {

    console.log(e.key);

    // ======================================
    // Tab Autocomplete
    // ======================================
    if (e.key === "Tab") {

        e.preventDefault();

        const input = terminalInput.value.trim();
        const parts = input.split(" ");

        // -------------------------
        // Complete command
        // -------------------------
        if (parts.length === 1) {

            const current = parts[0].toLowerCase();

            const matches = commandList.filter(cmd =>
                cmd.startsWith(current)
            );

            if (matches.length === 1) {

                terminalInput.value = matches[0];

            } else if (matches.length > 1) {

                terminalOutput.innerHTML += `
                    <p>${matches.join("    ")}</p>
                `;

                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }

        }

        // -------------------------
        // Complete directory after cd
        // -------------------------
        else if (parts[0] === "cd") {

            const directories = [
                "projects",
                "..",
                "~"
            ];

            const current = parts[1].toLowerCase();

            const matches = directories.filter(dir =>
                dir.startsWith(current)
            );

            if (matches.length === 1) {

                terminalInput.value = `cd ${matches[0]}`;

            } else if (matches.length > 1) {

                terminalOutput.innerHTML += `
                    <p>${matches.join("    ")}</p>
                `;

                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }

        }

        return;
    }

    // Previous command
    if (e.key === "ArrowUp") {

        if (commandHistory.length === 0) return;

        if (historyIndex < 0) {
            historyIndex = commandHistory.length - 1;
        } else if (historyIndex > 0) {
            historyIndex--;
        }

        terminalInput.value = commandHistory[historyIndex];

        e.preventDefault();
        return;
    }

    // Next command
    if (e.key === "ArrowDown") {

        if (commandHistory.length === 0) return;

        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = "";
        }

        e.preventDefault();
        return;
    }

    if (e.key !== "Enter") return;

    const command = terminalInput.value.trim().toLowerCase();

    const parts = command.split(" ");

    if (command !== "") {
        commandHistory.push(command);
    }

    historyIndex = commandHistory.length;

    terminalOutput.innerHTML += `
    <p>
        <span class="green">dipak@portfolio:${currentDirectory}$</span>
        ${command}
        <span class="cursor">█</span>
    </p>
    `;

    if (command === "clear") {

        terminalOutput.innerHTML = "";

    }

    else if (command === "resume") {

        terminalOutput.innerHTML += `
    <pre>
    Resume Found

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    Name      : Dipak Kine
    Role      : DevOps Engineer
    Version   : July 2026
    Format    : PDF

    Available Commands

    preview   - Open resume in a new tab
    download  - Download resume

    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    </pre>
    `;

    }

    else if (command === "preview") {

        terminalOutput.innerHTML += `
            <p>Opening resume...</p>
        `;

        window.open("./Dipak_Kine_DevOps_Engineer.pdf", "_blank");

    }

    else if (command === "download") {

        terminalOutput.innerHTML += `
    <pre id="download-progress">
    Preparing download...

    [□□□□□□□□□□□□□□] 0%
    </pre>
    `;

        const progress = document.getElementById("download-progress");

        const frames = [
            "[██□□□□□□□□□□□□] 20%",
            "[████□□□□□□□□□□] 40%",
            "[██████□□□□□□□□] 60%",
            "[██████████□□□□] 80%",
            "[██████████████] 100%"
        ];

        let index = 0;

        const interval = setInterval(() => {

            progress.innerHTML = `
    Preparing download...

    ${frames[index]}
    `;

            index++;

            if (index >= frames.length) {

                clearInterval(interval);

                progress.innerHTML = `
                Preparing download...

                ${frames[frames.length - 1]}

                Starting download...
                `;

                setTimeout(() => {

                    const a = document.createElement("a");

                    a.href = "./Dipak_Kine_DevOps_Engineer.pdf";

                    a.download = "Dipak_Kine_DevOps_Engineer.pdf";

                    document.body.appendChild(a);

                    a.click();

                    document.body.removeChild(a);

                    progress.innerHTML = `
                Download initiated successfully ✅

                Check your browser downloads.
                `;

                }, 600);

            }

        }, 250);

    }

    else if (command === "github") {

        window.open(
            "https://github.com/deepakkine",
            "_blank"
        );

    }

    else if (command === "linkedin") {

        window.open(
            "https://www.linkedin.com/in/dipak-k-903a343b9/",
            "_blank"
        );

    }

    // ======================================
    // cd
    // ======================================
    else if (parts[0] === "cd") {

        if (parts.length === 1 || parts[1] === "~") {

            currentDirectory = "~";

            terminalOutput.innerHTML += `
                <p>Changed directory to ~/</p>
            `;

        }

        else if (parts[1] === "projects") {

            currentDirectory = "~/projects";

            terminalOutput.innerHTML += `
                <p>Changed directory to ~/projects</p>
            `;

        }

        else if (parts[1] === "..") {

            currentDirectory = "~";

            terminalOutput.innerHTML += `
                <p>Changed directory to ~/</p>
            `;

        }

        else {

            terminalOutput.innerHTML += `
                <p>cd: ${parts[1]}: No such directory</p>
            `;

        }

    }

    // ======================================
    // ls
    // ======================================
    else if (command === "ls") {

        if (currentDirectory === "~") {

            terminalOutput.innerHTML += `
    <pre>
    resume.pdf
    projects/
    skills/
    about.txt
    contact.txt
    github.url
    linkedin.url
    </pre>
    `;

        }

        else if (currentDirectory === "~/projects") {

            terminalOutput.innerHTML += `
    <pre>
    aws-three-tier-devsecops-platform/
    cloud-native-devops-platform/
    kubernetes-three-tier-app/
    terraform-jenkins/
    </pre>
    `;

        }

    }

    // ======================================
    // pwd
    // ======================================
    else if (command === "pwd") {

        let path = "/home/dipak";

        if (currentDirectory === "~/projects") {
            path = "/home/dipak/projects";
        }

        terminalOutput.innerHTML += `
    <pre>${path}</pre>
    `;

    }

    // ======================================
    // cat
    // ======================================
    else if (parts[0] === "cat") {

        if (parts.length < 2) {

            terminalOutput.innerHTML += `
    <p>Usage: cat &lt;filename&gt;</p>
    `;

        }

        else if (parts[1] === "about.txt") {

            terminalOutput.innerHTML += `
    <pre>
    Dipak Kine

    DevOps Engineer

    Specialized in:

    • AWS Cloud
    • Kubernetes
    • Docker
    • Terraform
    • GitHub Actions
    • Linux
    • CI/CD
    • Monitoring
    </pre>
    `;

        }

        else if (parts[1] === "contact.txt") {

            terminalOutput.innerHTML += `
    <pre>
    Email

    kinedipak97@gmail.com

    Phone

    +91 72193 67609

    Location

    India
    </pre>
    `;

        }

        else if (parts[1] === "resume.pdf") {

            terminalOutput.innerHTML += `
    <pre>
    Binary file detected.

    Use:

    preview

    or

    download
    </pre>
    `;

        }

        else {

            terminalOutput.innerHTML += `
    <p>cat: ${parts[1]}: No such file</p>
    `;

        }

    }

    else if (commands[command]) {

        typeOutput(commands[command]);

    }

    else {

        terminalOutput.innerHTML += `
            <p>
                Command not found.

                Type
                <strong>help</strong>
                to see available commands.
            </p>
        `;

    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;

    terminalInput.value = "";

});