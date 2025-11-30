from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
import random
import sympy

router = APIRouter(
    prefix="/api/generate-problem",
    tags=["Problem Generator"],
)

class Problem(BaseModel):
    id: str
    type: str
    question: str
    options: Optional[List[str]] = None
    answer: str
    hint: str

@router.get("", response_model=Problem)
async def generate_problem(topic: str = Query(..., description="Topic ID")):
    """
    Generates a random math problem based on the requested topic.
    Currently supports 'algebra-basics' and 'geometry-intro' with dynamic generation.
    Falls back to simple addition for other topics.
    """
    problem_id = f"gen-{random.randint(1000, 9999)}"

    if topic == "algebra-basics" or "algebra" in topic:
        # Generate simple linear equation ax + b = c
        x = sympy.symbols('x')
        a = random.randint(2, 9)
        b = random.randint(1, 20)
        sol = random.randint(1, 10)
        c = a * sol + b

        # Randomly choose between input and mcq
        p_type = random.choice(["input", "mcq"])

        question = f"Solve for x: {a}x + {b} = {c}"
        answer = str(sol)
        hint = f"Subtract {b} from both sides, then divide by {a}."

        options = None
        if p_type == "mcq":
            options = [str(sol)]
            while len(options) < 4:
                wrong = str(random.randint(sol-5 if sol>5 else 0, sol+10))
                if wrong not in options and wrong != str(sol):
                    options.append(wrong)
            random.shuffle(options)

        return Problem(
            id=problem_id,
            type=p_type,
            question=question,
            options=options,
            answer=answer,
            hint=hint
        )

    elif topic == "geometry-intro" or "geometry" in topic:
         # Simple geometry question
         questions = [
             {
                 "q": "How many degrees are in a right angle?",
                 "a": "90",
                 "h": "Think of a square corner.",
                 "o": ["45", "90", "180", "360"]
             },
             {
                 "q": "What do angles in a triangle sum to?",
                 "a": "180",
                 "h": "It's half of a square (360) is not quite right logic but sum is 180.",
                 "o": ["90", "180", "270", "360"]
             },
             {
                 "q": "What is the name of a triangle with 3 equal sides?",
                 "a": "Equilateral",
                 "h": "All sides are equal.",
                 "o": ["Isosceles", "Scalene", "Equilateral", "Right"]
             }
         ]
         q_data = random.choice(questions)
         return Problem(
            id=problem_id,
            type="mcq",
            question=q_data["q"],
            options=q_data["o"],
            answer=q_data["a"],
            hint=q_data["h"]
        )
    elif topic == "fractions" or "fraction" in topic:
         num1 = random.randint(1, 5)
         den = random.randint(2, 10)
         num2 = random.randint(1, 5)

         if random.choice([True, False]):
             # Addition same denominator
             question = f"What is {num1}/{den} + {num2}/{den}?"
             ans_num = num1 + num2
             answer = f"{ans_num}/{den}"
             hint = "Add the numerators, keep the denominator."
             options = [answer, f"{num1*num2}/{den}", f"{num1+num2}/{den*2}", f"{num1}/{den}"]
         else:
             # Simple fraction identification
             question = f"Which fraction represents {num1} parts out of {den}?"
             answer = f"{num1}/{den}"
             hint = "Numerator is parts, denominator is whole."
             options = [f"{num1}/{den}", f"{den}/{num1}", f"1/{den}", f"{num1}/10"]

         # Ensure unique options
         options = list(set(options))
         while len(options) < 4:
             options.append(f"{random.randint(1,10)}/{den}")
         random.shuffle(options)

         return Problem(
            id=problem_id,
            type="mcq",
            question=question,
            options=options,
            answer=answer,
            hint=hint
        )

    else:
        # Generic fallback
        a = random.randint(1, 10)
        b = random.randint(1, 10)
        return Problem(
            id=problem_id,
            type="input",
            question=f"What is {a} + {b}?",
            answer=str(a+b),
            hint="Count them together."
        )
