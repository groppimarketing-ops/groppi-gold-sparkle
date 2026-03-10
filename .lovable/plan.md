
I will add the "Meet the Team" section to the About Us page, featuring the leadership, core team, and external specialists with the uploaded images.

The plan involves:

1.  **Asset Management**:
    *   Copy the 10 uploaded images from `user-uploads://` to `src/assets/team/` with descriptive names (e.g., `mohamed-salah.png`, `alexander-roth.png`).
    *   Map the images to the corresponding team members based on the visual descriptions.
    *   Use a placeholder image for the 3 specialists whose photos are not yet provided (Arjun, Bilal, Rohan).

2.  **Component Creation**:
    *   Create a new component `src/components/about/TeamSection.tsx`.
    *   Implement the "Groppi style":
        *   Dark backgrounds with subtle radial gradients.
        *   Gold accents and borders (`border-primary/20` or similar gold hex).
        *   Circular profile photos with gold outlines.
        *   Responsive grid layout.
        *   Three distinct groups: Leadership, Core Team, External Specialists.
    *   Include hover effects using `framer-motion`.

3.  **Page Integration**:
    *   Update `src/pages/About.tsx` to import and render `<TeamSection />`.
    *   Place the section after the "Values" block and before the "Closing CTA" to maintain a logical flow (Who We Are -> Approach -> Mission -> Timeline -> Values -> **Team** -> CTA).

4.  **Dependencies**:
    *   Use existing UI components like `GlassCard`, `SectionHeader`, and `Button` (if needed).
    *   Use `lucide-react` for any social icons if implied (though not explicitly requested, I'll stick to clean profiles first).

Technical details:
*   **Images**:
    *   Mohamed Salah (Egyptian man) -> `mohamed-salah.png`
    *   Alexander Roth (Man 34y) -> `alexander-roth.png`
    *   Thomas De Wilde (Man 32y) -> `thomas-de-wilde.png`
    *   Lukas Meyer (Young man 26y) -> `lukas-meyer.png`
    *   Sophie Van Dijk (Creative woman) -> `sophie-van-dijk.png`
    *   Claire Dumont (Woman 34y) -> `claire-dumont.png`
    *   Elise Verhaegen (Woman 29y) -> `elise-verhaegen.png`
    *   Camille Laurent (Woman 28y) -> `camille-laurent.png`
    *   Julia Van Aertselaer (Woman 28y) -> `julia-van-aertselaer.png`
    *   Marco Bianchi (Man 27y) -> `marco-bianchi.png`
