import os

# Define the structure based on the updated src/data/index.js
curriculum_structure = {
    "2": ["Math", "Language Arts", "Science"],
    "3": ["Math", "Language Arts", "Science"],
    "4": ["Math", "Language Arts", "Science"],
    "5": ["Math", "Language Arts", "Science"],
    "6": ["Math", "Language Arts", "Science"],
    "7": ["Math", "Language Arts", "Science"],
    "8": ["Math", "Language Arts", "Science"],
    "9": ["Math", "Science", "Language Arts"],
    "10": ["Math", "Science", "History"],
    "11": ["Math", "Science", "History"],
    "12": ["Math", "Government", "Economics"],
    "GED": ["Math", "Language Arts", "Science", "Social Studies"],
    "Advanced": ["AI", "Quantum", "STEAM"]
}

agent_instructions = {
    "K": "Tone: Warm, encouraging, very simple vocabulary. Focus on visual aids.",
    "1": "Tone: Friendly, simple sentences. Focus on building confidence.",
    "2": "Tone: Supportive. Introduce slightly longer sentences.",
    "3": "Tone: Engaging. Start introducing subject-specific vocabulary.",
    "4": "Tone: Curious. Encourage questions and exploration.",
    "5": "Tone: Structured. Focus on clarity and organization.",
    "6": "Tone: Mentorship. Help transition to middle school concepts.",
    "7": "Tone: Analytical. Encourage critical thinking.",
    "8": "Tone: Preparatory. Get ready for high school rigor.",
    "9": "Tone: Academic. Focus on foundations of complex topics.",
    "10": "Tone: Rigorous. Deep dive into specific subjects.",
    "11": "Tone: Advanced. Prepare for college-level thinking.",
    "12": "Tone: Scholarly. Focus on mastery and application.",
    "GED": "Tone: Practical, adult-oriented, goal-focused. Emphasis on passing the test.",
    "Advanced": "Tone: Professional, technical, cutting-edge. Assume high aptitude."
}

def create_files():
    for grade, subjects in curriculum_structure.items():
        # Create grade directory
        grade_dir = grade
        if not os.path.exists(grade_dir):
            os.makedirs(grade_dir)
            print(f"Created directory: {grade_dir}")

        # Create AGENTS.md
        agent_content = f"# Agent Instructions for {grade}\n\n{agent_instructions.get(grade, 'Tone: Helpful and educational.')}\n\n## Goals\n* Ensure mastery of standards.\n* Provide clear feedback.\n"
        # Only create if it doesn't exist to avoid overwriting custom ones if they existed (though likely they don't for new dirs)
        agent_path = os.path.join(grade_dir, "AGENTS.md")
        if not os.path.exists(agent_path):
             with open(agent_path, "w") as f:
                f.write(agent_content)

        for subject in subjects:
            # Handle spaces in subject names for folder structure
            subject_dir_name = subject.replace(" ", "_")
            subject_path = os.path.join(grade_dir, subject_dir_name)

            if not os.path.exists(subject_path):
                os.makedirs(subject_path)
                print(f"Created subject directory: {subject_path}")

            # Create README.md for the subject
            readme_path = os.path.join(subject_path, "README.md")
            if not os.path.exists(readme_path):
                readme_content = f"# {grade} - {subject}\n\n## Curriculum Overview\n\nThis folder contains materials for {subject} at the {grade} level.\n\n### Units\n\n(See src/data/index.js for active units)\n\n## Resources\n\n* [Pending population]\n"
                with open(readme_path, "w") as f:
                    f.write(readme_content)

if __name__ == "__main__":
    create_files()
