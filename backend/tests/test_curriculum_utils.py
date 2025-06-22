import pytest
from backend.routers.curriculum import get_human_readable_name_from_filename, get_human_readable_name_from_dirname

# DEV_NOTES:
# The .title() method used in the helper functions has specific behaviors with acronyms
# (e.g., "NYSNextGen" -> "Nysnextgen", "ComputerScience" -> "Computerscience").
# If more precise capitalization is needed (e.g., preserving acronyms or specific camel casing),
# these helper functions would require more sophisticated logic.
# For now, the current behavior based on Python's string `.title()` method is accepted and tested as is.
#
# To run these tests:
# 1. Ensure pytest is installed (`pip install pytest` - should be in requirements.txt).
# 2. From the project root directory, run: `python -m pytest backend`
#    Alternatively, navigate to `backend/` and run `PYTHONPATH=. pytest` or simply `pytest`.

@pytest.mark.parametrize("filename, expected", [
    ("Algebra1_NYSNextGen.md", "Algebra1 Nysnextgen"),
    ("Intro-To-Calculus.md", "Intro - To - Calculus"),
    ("File.md", "File"),
    ("Geometry.md", "Geometry"),
    ("WORLD_HISTORY.md", "World History")
])
def test_filename_to_readable_parametrized(filename, expected):
    assert get_human_readable_name_from_filename(filename) == expected

@pytest.mark.parametrize("dirname, expected", [
    ("High_9-12", "High 9 - 12"),
    ("ComputerScience", "Computerscience"),
    ("Arts", "Arts"),
    ("Some-Subject-Area", "Some - Subject - Area"),
    ("ENGLISH_LANGUAGE_ARTS", "English Language Arts")
])
def test_dirname_to_readable_parametrized(dirname, expected):
    assert get_human_readable_name_from_dirname(dirname) == expected
