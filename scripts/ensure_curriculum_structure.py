import os

CURRICULUM_DIR = "curriculum"

REQUIRED_STRUCTURE = {
    "Elementary_K-5": {
        "Mathematics": 2,
        "Science": 2,
        "EnglishLanguageArts": 2,
        "SocialStudies": 2
    },
    "High_9-12": {
        "Mathematics": 2,
        "Science": 2,
        "EnglishLanguageArts": 2,
        "SocialStudies": 2
    }
}

TEMPLATE_CONTENT = """
## I. Overview
*   **Subject Description:** {subject} lesson for {grade_level}.
*   **Learning Standards:** Aligned with state standards.

## II. Core Concepts
*   **Topic 1:** Introduction to {topic}.
    *   Key Concepts: Understanding the basics.
    *   Learning Objectives: Student will be able to define {topic}.

## III. Activities
*   **Activity 1:** Class discussion.
*   **Activity 2:** Worksheet practice.

## IV. Assessment
*   **Quiz:** Short quiz on concepts.
"""

def get_frontmatter(title, grade, subject, duration=45, tags=[]):
    tags_str = ", ".join(tags)
    return f"""---
title: {title}
grade_level: "{grade}"
subject: {subject}
duration_minutes: {duration}
tags: [{tags_str}]
---

"""

def process_directory(grade_dir_name, requirements):
    grade_path = os.path.join(CURRICULUM_DIR, grade_dir_name)
    if not os.path.exists(grade_path):
        os.makedirs(grade_path)

    for subject, required_count in requirements.items():
        subject_path = os.path.join(grade_path, subject)
        if not os.path.exists(subject_path):
            os.makedirs(subject_path)
            print(f"Created directory: {subject_path}")

        existing_files = [f for f in os.listdir(subject_path) if f.endswith('.md')]

        # 1. Update existing files with Frontmatter
        for filename in existing_files:
            filepath = os.path.join(subject_path, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            if not content.strip().startswith('---'):
                print(f"Adding frontmatter to {filename}")
                # Derive metadata from filename
                title = filename.replace('.md', '').replace('_', ' ')
                grade_level = grade_dir_name.split('_')[-1] # e.g. "K-5" or "9-12"
                # Try to extract specific grade from filename if possible
                if "Grade" in filename:
                    parts = filename.split('_')
                    for p in parts:
                        if p.startswith("Grade"):
                            grade_level = p.replace("Grade", "")
                            break

                fm = get_frontmatter(title, grade_level, subject, tags=[subject.lower(), "intro"])
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(fm + content)

        # 2. Create missing files
        current_count = len(existing_files)
        if current_count < required_count:
            needed = required_count - current_count
            print(f"Need {needed} more lessons for {grade_dir_name}/{subject}")

            for i in range(needed):
                # Create a new lesson
                lesson_num = current_count + i + 1
                new_filename = f"{subject}_Lesson{lesson_num}_Intro.md"
                # Make sure we don't overwrite if by chance it exists but wasn't counted (unlikely)
                while os.path.exists(os.path.join(subject_path, new_filename)):
                    lesson_num += 1
                    new_filename = f"{subject}_Lesson{lesson_num}_Intro.md"

                filepath = os.path.join(subject_path, new_filename)
                title = f"{subject} Lesson {lesson_num}: Introduction"
                grade_level = grade_dir_name.split('_')[-1]

                fm = get_frontmatter(title, grade_level, subject, tags=[subject.lower(), "new"])
                body = TEMPLATE_CONTENT.format(subject=subject, grade_level=grade_level, topic="Fundamental Concepts")

                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(fm + body)
                print(f"Created {new_filename}")

if __name__ == "__main__":
    for grade_dir, reqs in REQUIRED_STRUCTURE.items():
        process_directory(grade_dir, reqs)
