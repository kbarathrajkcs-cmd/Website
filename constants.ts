
export const PYTHON_CODE_SNIPPET = `
import re

def check_password_strength(password):
    """
    Analyzes password strength based on standard cybersecurity criteria.
    Returns: (Strength Label, List of Feedback)
    """
    feedback = []
    score = 0
    
    # 1. Check Length (Min 8 characters)
    if len(password) >= 8:
        score += 1
    else:
        feedback.append("Password is too short (min 8 characters).")

    # 2. Check for Uppercase letters
    if re.search(r'[A-Z]', password):
        score += 1
    else:
        feedback.append("Missing at least one uppercase letter (A-Z).")

    # 3. Check for Lowercase letters
    if re.search(r'[a-z]', password):
        score += 1
    else:
        feedback.append("Missing at least one lowercase letter (a-z).")

    # 4. Check for Numbers
    if re.search(r'[0-9]', password):
        score += 1
    else:
        feedback.append("Missing at least one numerical digit (0-9).")

    # 5. Check for Special Characters
    if re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        score += 1
    else:
        feedback.append("Missing at least one special character (e.g., @, #, $).")

    # Final Classification
    if score <= 2:
        return "Weak", feedback
    elif score <= 4:
        return "Medium", feedback
    else:
        return "Strong", ["Great job! Your password meets all security criteria."]

# --- Educational Usage ---
if __name__ == "__main__":
    print("--- CyberSecurity Password Strength Checker ---")
    user_input = input("Enter a password to test: ")
    strength, suggestions = check_password_strength(user_input)
    
    print(f"\\nResult: {strength}")
    print("Analysis:")
    for tip in suggestions:
        print(f"- {tip}")
`;

export const SECURITY_WHY = `
Strong passwords are the first line of defense in cybersecurity. 
A strong password protects against 'Brute Force' attacks where hackers use 
automated scripts to guess millions of combinations per second.

Complexity (Uppercase, Numbers, Symbols) increases "Entropy", making 
it exponentially harder for machines to crack your credentials.
`;
