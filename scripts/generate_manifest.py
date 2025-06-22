import os
import json
import re

CURRICULUM_DIR = "curriculum"
OUTPUT_PATH = "public/curriculum_manifest.json"
# DEV_NOTE: Ensure this script is run from the root of the repository.

def generate_human_readable_name(name_id, is_lesson=False):
    """Converts a slug/filename to a more human-readable name."""
    if is_lesson:
        name_id = name_id.replace('.md', '')
    # Replace underscores and hyphens with spaces, then capitalize words
    name_parts = re.split(r'[_-]', name_id)
    return ' '.join(word.capitalize() for word in name_parts if word)

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
        for grade_id in sorted(os.listdir(CURRICULUM_DIR)):
            grade_path = os.path.join(CURRICULUM_DIR, grade_id)
            if os.path.isdir(grade_path) and not grade_id.startswith('.'):
                grade_level_obj = {
                    "id": grade_id,
                    "name": generate_human_readable_name(grade_id),
                    "subjects": []
                }

                for subject_id in sorted(os.listdir(grade_path)):
                    subject_path = os.path.join(grade_path, subject_id)
                    if os.path.isdir(subject_path) and not subject_id.startswith('.'):
                        subject_obj = {
                            "id": subject_id,
                            "name": generate_human_readable_name(subject_id),
                            "lessons": []
                        }

                        for lesson_filename in sorted(os.listdir(subject_path)):
                            lesson_file_path = os.path.join(subject_path, lesson_filename)
                            if os.path.isfile(lesson_file_path) and lesson_filename.endswith('.md') and not lesson_filename.startswith('.'):
                                lesson_obj = {
                                    "id": lesson_filename,
                                    "name": generate_human_readable_name(lesson_filename, is_lesson=True),
                                    "path": lesson_file_path.replace(os.path.sep, '/') # Ensure forward slashes for web paths
                                }
                                subject_obj["lessons"].append(lesson_obj)

                        if subject_obj["lessons"]: # Only add subject if it has lessons
                            grade_level_obj["subjects"].append(subject_obj)

                if grade_level_obj["subjects"]: # Only add grade level if it has subjects
                    manifest["gradeLevels"].append(grade_level_obj)

        # Ensure output directory exists
        output_dir = os.path.dirname(OUTPUT_PATH)
        if output_dir and not os.path.exists(output_dir):
            os.makedirs(output_dir)
            print(f"Created directory: {output_dir}")

        with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2, ensure_ascii=False)

        print(f"Successfully generated curriculum manifest at: {OUTPUT_PATH}")
        if not manifest["gradeLevels"]:
            print("Warning: No grade levels with content found. The manifest is empty.")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
