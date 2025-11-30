import os
import json
import re

# Determine the repository root based on the script location
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.dirname(SCRIPT_DIR)

CURRICULUM_DIR = os.path.join(REPO_ROOT, "curriculum")
OUTPUT_PATH = os.path.join(REPO_ROOT, "public/curriculum_manifest.json")
HTML_BROWSER_PATH = os.path.join(REPO_ROOT, "public/browse_curriculum.html")

def generate_human_readable_name(name_id, is_lesson=False):
    """Converts a slug/filename to a more human-readable name."""
    if is_lesson:
        name_id = name_id.replace('.md', '')
    # Replace underscores and hyphens with spaces, then capitalize words
    name_parts = re.split(r'[_-]', name_id)
    return ' '.join(word.capitalize() for word in name_parts if word)

def format_category(rel_dir):
    """Formats a relative directory path into a readable category string."""
    if not rel_dir or rel_dir == '.':
        return ""

    parts = rel_dir.split(os.path.sep)
    readable_parts = [generate_human_readable_name(p) for p in parts]
    return " > ".join(readable_parts)

def update_html_browser(manifest_data):
    """Updates the fallback data in the HTML browser file."""
    if not os.path.exists(HTML_BROWSER_PATH):
        print(f"Warning: {HTML_BROWSER_PATH} not found. Skipping HTML update.")
        return

    try:
        with open(HTML_BROWSER_PATH, 'r', encoding='utf-8') as f:
            content = f.read()

        # Create the JSON string for the fallback data
        json_str = json.dumps(manifest_data, indent=2, ensure_ascii=False)

        # Regex to find the variable definition: const fallbackCurriculumData = { ... };
        # Using [\s\S]*? to match across lines non-greedily
        pattern = r"(const\s+fallbackCurriculumData\s*=\s*)\{[\s\S]*?\};"

        replacement = f"\\1{json_str};"

        new_content, count = re.subn(pattern, replacement, content, count=1)

        if count > 0:
            with open(HTML_BROWSER_PATH, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Successfully updated fallback data in {HTML_BROWSER_PATH}")
        else:
            print(f"Warning: Could not find 'const fallbackCurriculumData = ...;' in {HTML_BROWSER_PATH}")

    except Exception as e:
        print(f"Error updating HTML browser: {e}")

def main():
    """
    Scans the CURRICULUM_DIR and generates a JSON manifest file
    describing the curriculum structure.
    """
    if not os.path.isdir(CURRICULUM_DIR):
        print(f"Error: Curriculum directory '{CURRICULUM_DIR}' not found.")
        print("Please ensure this script is run from the repository root and the directory exists.")
        return

    manifest = {"gradeLevels": []}

    try:
        # Traverse Grade Levels (e.g., Elementary_K-5, High_9-12)
        for grade_id in sorted(os.listdir(CURRICULUM_DIR)):
            grade_path = os.path.join(CURRICULUM_DIR, grade_id)

            # Skip files and hidden directories
            if not os.path.isdir(grade_path) or grade_id.startswith('.'):
                continue

            grade_level_obj = {
                "id": grade_id,
                "name": generate_human_readable_name(grade_id),
                "subjects": []
            }

            # Traverse Subjects (e.g., Mathematics, Science)
            for subject_id in sorted(os.listdir(grade_path)):
                subject_path = os.path.join(grade_path, subject_id)

                # Skip files and hidden directories
                if not os.path.isdir(subject_path) or subject_id.startswith('.'):
                    continue

                subject_obj = {
                    "id": subject_id,
                    "name": generate_human_readable_name(subject_id),
                    "lessons": []
                }

                # Recursively walk the subject directory to find all markdown files
                for root, dirs, files in os.walk(subject_path):
                    # Sort dirs and files in place for consistent ordering
                    dirs.sort()
                    files.sort()

                    for lesson_filename in files:
                        if lesson_filename.endswith('.md') and not lesson_filename.startswith('.'):
                            lesson_file_path = os.path.join(root, lesson_filename)

                            # Calculate relative path from the subject root to the file's directory
                            # This will determine the "Category" or "Group"
                            rel_dir = os.path.relpath(root, subject_path)

                            category = format_category(rel_dir)

                            # Create path relative to REPO_ROOT for web access
                            rel_path_repo = os.path.relpath(lesson_file_path, REPO_ROOT)

                            lesson_obj = {
                                "id": lesson_filename,
                                "name": generate_human_readable_name(lesson_filename, is_lesson=True),
                                "path": rel_path_repo.replace(os.path.sep, '/'), # Ensure forward slashes
                                "category": category
                            }
                            subject_obj["lessons"].append(lesson_obj)

                if subject_obj["lessons"]: # Only add subject if it has lessons
                    # Sort lessons by category then by name
                    subject_obj["lessons"].sort(key=lambda x: (x["category"], x["name"]))
                    grade_level_obj["subjects"].append(subject_obj)

            if grade_level_obj["subjects"]: # Only add grade level if it has subjects
                manifest["gradeLevels"].append(grade_level_obj)

        # Ensure output directory exists
        output_dir = os.path.dirname(OUTPUT_PATH)
        if output_dir and not os.path.exists(output_dir):
            os.makedirs(output_dir)
            print(f"Created directory: {output_dir}")

        # Write manifest JSON
        with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2, ensure_ascii=False)

        print(f"Successfully generated curriculum manifest at: {OUTPUT_PATH}")
        if not manifest["gradeLevels"]:
            print("Warning: No grade levels with content found. The manifest is empty.")

        # Update HTML browser with fallback data
        update_html_browser(manifest)

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
