import re

def fix_imports(filepath, root_depth, local_depth):
    with open(filepath, 'r') as file:
        content = file.read()

    # The previous script changed EVERYTHING pointing to "constants"
    # We need to distinguish between root constants (Colors, Fonts) and local constants
    
    # 1. First, restore all constants imports to standard local/root lines
    # Let's just find lines with EVENT_TYPES, CreateEventForm, STEPS, DIFFICULTY_OPTIONS, EQUIPMENT_PRESETS, formatDate, formatTime, createEventSchema
    # and map them to local_depth.
    local_items = ['EVENT_TYPES', 'CreateEventForm', 'STEPS', 'DIFFICULTY_OPTIONS', 'EQUIPMENT_PRESETS', 'formatDate', 'formatTime', 'createEventSchema']
    
    lines = content.split('\n')
    new_lines = []
    
    for line in lines:
        if 'import' in line and ('constants' in line or 'Constants' in line):
            # Check if this line imports local items
            if any(item in line for item in local_items):
                # Replace the path with local_depth
                line = re.sub(r"from\s*['\"].*?constants['\"]", f"from '{local_depth}constants'", line)
            else:
                # Replace with root_depth
                line = re.sub(r"from\s*['\"].*?constants['\"]", f"from '{root_depth}constants'", line)
        new_lines.append(line)
        
    with open(filepath, 'w') as file:
        file.write('\n'.join(new_lines))

fix_imports('src/app/events/create/index.tsx', '../../../', './')
fix_imports('src/app/events/create/components/StepDetails.tsx', '../../../../', '../')
fix_imports('src/app/events/create/components/StepSchedule.tsx', '../../../../', '../')
fix_imports('src/app/events/create/components/StepSettings.tsx', '../../../../', '../')
fix_imports('src/app/events/create/components/FieldError.tsx', '../../../../', '../')
