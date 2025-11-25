import os

# Determine the repository root based on the script location
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(SCRIPT_DIR)
CURRICULUM_DIR = os.path.join(REPO_ROOT, "curriculum")

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
## I. Lesson Overview
*   **Subject:** {subject}
*   **Grade Level:** {grade_level}
*   **Topic:** {topic}
*   **Estimated Duration:** 45 minutes

## II. Learning Objectives
By the end of this lesson, students will be able to:
1.  Understand the core concepts of {topic}.
2.  Apply {topic} in simple scenarios.
3.  Demonstrate knowledge through a short activity.

## III. Standards Alignment
*   **Common Core / State Standards:** (Placeholder for specific standard codes)
*   **Skill Focus:** Critical thinking, analysis, and application.

## IV. Materials Needed
*   Textbook / Reading materials (digital or physical)
*   Notebook and writing instruments
*   (Optional) Digital device for interactive exercises

## V. Lesson Procedure

### A. Introduction (5-10 minutes)
*   **Hook:** Start with an engaging question about {topic}.
*   **Review:** Briefly review previous related concepts.

### B. Direct Instruction (15-20 minutes)
*   Explain the definition of {topic}.
*   Provide real-world examples.
*   *Teacher Note:* Use visual aids to illustrate key points.

### C. Guided Practice (10 minutes)
*   Work through a sample problem or scenario as a class.
*   Ask students to volunteer answers.

### D. Independent Practice (10 minutes)
*   Students complete the attached worksheet or digital activity.
*   Circulate to provide assistance.

## VI. Assessment & Wrap-up
*   **Exit Ticket:** Write down one thing learned about {topic} today.
*   **Homework:** Review notes and prepare for the next lesson.

## VII. Resources & References
*   [Link to external resource 1]
*   [Link to external resource 2]
"""

def get_frontmatter(title, grade, subject, duration=45, tags=[]):
    # Ensure tags are properly formatted for YAML list
    tags_str = ", ".join([f'"{t}"' for t in tags])
    return f"""---
title: "{title}"
grade_level: "{grade}"
subject: "{subject}"
duration_minutes: {duration}
tags: [{tags_str}]
---

"""

def process_directory(grade_dir_name, requirements):
    grade_path = os.path.join(CURRICULUM_DIR, grade_dir_name)
    if not os.path.exists(grade_path):
        os.makedirs(grade_path)
        print(f"Created grade directory: {grade_path}")

    for subject, required_count in requirements.items():
        subject_path = os.path.join(grade_path, subject)
        if not os.path.exists(subject_path):
            os.makedirs(subject_path)
            print(f"Created subject directory: {subject_path}")

        existing_files = [f for f in os.listdir(subject_path) if f.endswith('.md')]

        # 1. Update existing files with Frontmatter if missing
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

                fm = get_frontmatter(title, grade_level, subject, tags=[subject.lower(), "intro", "legacy"])
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(fm + content)

        # 2. Create missing files (Count only explicit Lesson files to ensure we have actual lessons)
        lesson_files = [f for f in existing_files if "Lesson" in f]
        current_lesson_count = len(lesson_files)

        # Determine the next lesson number based on existing files to avoid collision
        next_lesson_num = 1
        if lesson_files:
             # Try to extract numbers from filenames like Subject_LessonX_Intro.md
             import re
             nums = []
             for f in lesson_files:
                 match = re.search(r'Lesson(\d+)', f)
                 if match:
                     nums.append(int(match.group(1)))
             if nums:
                 next_lesson_num = max(nums) + 1

        if current_lesson_count < required_count:
            needed = required_count - current_lesson_count
            print(f"Need {needed} more lessons for {grade_dir_name}/{subject}")

            for i in range(needed):
                # Create a new lesson
                lesson_num = next_lesson_num + i
                new_filename = f"{subject}_Lesson{lesson_num}_Intro.md"

                filepath = os.path.join(subject_path, new_filename)

                # Check if file exists (sanity check)
                if os.path.exists(filepath):
                    print(f"Skipping {new_filename} as it already exists.")
                    continue

                title = f"{subject} Lesson {lesson_num}: Introduction"
                grade_level = grade_dir_name.split('_')[-1] # Use generic grade group if specific grade unknown

                fm = get_frontmatter(title, grade_level, subject, tags=[subject.lower(), "new", "intro"])
                body = TEMPLATE_CONTENT.format(subject=subject, grade_level=grade_level, topic="Fundamental Concepts")

                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(fm + body)
                print(f"Created {new_filename}")

if __name__ == "__main__":
    print(f"Generating curriculum in: {CURRICULUM_DIR}")
    for grade_dir, reqs in REQUIRED_STRUCTURE.items():
        process_directory(grade_dir, reqs)
