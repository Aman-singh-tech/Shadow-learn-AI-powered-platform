# Fix Missing Interactivity on Learning and Solutions Pages

The user reported that clicking the "Encoded Training Session" button on the Learning Modules page does nothing. My investigation revealed that both the `LearningModules.jsx` and `Solutions.jsx` pages lack `onClick` handlers and detailed view components for their respective items.

## User Review Required

> [!IMPORTANT]
> I propose using **Modals** for detailed views instead of new pages. This will maintain the "Single Page Application" feel and prevent the need for complex route management at this stage.

## Proposed Changes

### Frontend Components

#### [MODIFY] [LearningModules.jsx](file:///c:/Users/Aman%20Singh/OneDrive/Desktop/TEMP/shadowlearn/frontend/src/pages/LearningModules.jsx)
- Add `selectedModule` state.
- Implement a `ModuleDetailModal` component within the file.
- Add `onClick` handler to the "Encoded Training Session" button to open the modal.
- The modal will display the module description and a list of associated workflows (retrieved from the backend `populate`).

#### [MODIFY] [Solutions.jsx](file:///c:/Users/Aman%20Singh/OneDrive/Desktop/TEMP/shadowlearn/frontend/src/pages/Solutions.jsx)
- Add `selectedSolution` state.
- Implement a `SolutionDetailModal` to show the full problem description and the expert's solution.
- Add `onClick` handler to the `SolutionItem` cards or the chevron button.

## Verification Plan

### Manual Verification
- Log in as a user.
- Go to **Learning Modules**.
- Click **Encoded Training Session** on a module card. Verify that a modal opens showing module details and workflows.
- Go to **Solutions**.
- Click on a solution card. Verify that a modal opens showing the full problem and solution text.
