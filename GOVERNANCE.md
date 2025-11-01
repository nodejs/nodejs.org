# Node.js Web Team Governance

The Node.js Web Team (@nodejs/web) is a team in the Node.js Project that is composed by a set of subteams. Each containing specific responsibilities and goals.

### TSC Oversight

Any website change that expresses a position about a global event or group of people requires explicit
[TSC](https://github.com/nodejs/TSC/blob/main/TSC-Charter.md#section-4-responsibilities-of-the-tsc)
approval. This can be obtained by pinging `@nodejs/tsc` and receive no objections after seven days,
or by sending an email to `tsc@iojs.org` and receive at least one approval and no objections after seven days.

### Node.js Website Team (`@nodejs/nodejs-website`)

The Node.js Website Team is responsible for the day-to-day technical development of the Node.js Website. This is primarily the development of the website itself, adding new features, pages and components, but also fixing any security issues in the website code, handling operational maintenance, and so on.

The maintainers on the Node.js Website Team are responsible for steering the technical direction of the Node.js Website, and reserve the right to make final decisions on any issues or pull requests, in line with the Contribution Guidelines, Collaborator Guidelines, the Code of Conduct and the overall Governance premises of the Node.js project.

Members of this team are nominated through the guidelines provided in the [Contributing Guidelines](https://github.com/nodejs/nodejs.org/blob/main/CONTRIBUTING.md#becoming-a-collaborator) within this repository. After a passed nomination, members should submit a PR to add themselves to the list of current members, shown below.

#### Current Members

- [araujogui](https://github.com/araujogui) - **Guilherme Araújo** (he/him)

- [AugustinMauroy](https://github.com/AugustinMauroy) - **Augustin Mauroy** (he/him)

- [avivkeller](https://github.com/avivkeller) - **Aviv Keller** (he/him)

- [aymen94](https://github.com/aymen94) - **Aymen Naghmouchi**

- [benhalverson](https://github.com/benhalverson) - **Ben Halverson** (he/him)

- [bjohansebas](https://github.com/bjohansebas) - **Sebastian Beltran**

- [bmuenzenmeyer](https://github.com/bmuenzenmeyer) - **Brian Muenzenmeyer** (he/him)

- [bnb](https://github.com/bnb) - **Tierney Cyren** (they/them)

- [canerakdas](https://github.com/canerakdas) - **Caner Akdas**

- [dario-piotrowicz](https://github.com/dario-piotrowicz) - **Dario Piotrowicz**

- [Harkunwar](https://github.com/Harkunwar) - **Harkunwar Kochar** (he/him)

- [HinataKah0](https://github.com/HinataKah0) - **HinataKah0** (he/him)

- [manishprivet](https://github.com/manishprivet) - **Manish Kumar** (he/him)

- [mikeesto](https://github.com/mikeesto) - **Michael Esteban** (he/him)

- [ovflowd](https://github.com/ovflowd) - **Claudio Wunder** (they/them)

- [SEWeiTung](https://github.com/SEWeiTung) - **Wei Tung**

- [shanpriyan](https://github.com/shanpriyan) - **Shanmughapriyan S**

### Node.js Web Infra Team (`@nodejs/web-infra`)

The Node.js Web Infra Team is responsible for maintaining the Infrastructure relating to Node.js's Web Presence. The Node.js Web Infra team has the responsibilities of:

- Maintaining CI/CD pipelines related to Web Infrastructure
- Maintaining our Infrastructure Providers\*
- Have technical ownership on best-standards and best-practices for our Web Infrastructure (such as Web Frameworks that we use)

Web Infra Team members should have access to be able to maintain the services mentioned above.

Members of this team are nominated either by the Node.js Technical Steering Committee (TSC) or the Node.js Build WG and follow the guidelines provided in the Collaborator Guidelines of the Node.js Build WG. Note that members of the Node.js Web Team might also recommend people for nomination.

\* This team has access to infrastructure providers directly related to the Website only, such as Vercel. Other providers that are shared beyond the Website may be controlled by other teams (for example, the Node.js Build WG owns Cloudflare).

### Node.js Web Standards Team (`@nodejs/web-standards`)

The Node.js Web Standards Team is composed of Node.js Collaborators and External Collaborators that have extensive experience or expertisè on Web Standards, such as Ecma262. The Standards Team is responsible for guiding and serving as points of contact when either Node.js Collaborators, the Node.js Technical Steering Committee (TSC), or the Web Team, requires assistance or guidance regarding Web Standards.

Members of this team are nominated by the Node.js Technical Steering Committee (TSC). Note that members of the Node.js Web Team might also recommend people for nomination.

### Node.js UX & Design Team (`@nodejs/ux-and-design`)

The Node.js UX & Design Team is composed of Node.js Collaborators and External Collaborators that have experience or expertisè with UX & Design. The UX & Design Team is responsible for guiding and serving as points of contact when members of the Node.js Web Team require assistance or guidance regarding UX & Design.

Often members of this team will collaborate on providing best practices and guidelines for the Node.js Website, on matters of UX & Design. Members of this team are also responsible for providing feedback on the Node.js Website, and providing feedback on the Node.js Website's design. (For example, when a discussion arises regarding best practices on topics such as CSS, accessibility, UX flows and intent, or component design, the UX & Design Team has a say on the matter).

Members of this team are nominated by the Node.js Technical Steering Committee (TSC). Note that members of the Node.js Web Team might also recommend people for nomination.

## The Interoperability of the Node.js Web Team

As seen above, the different teams under the Node.js Web Team umbrella are responsible for having the oversight on different aspects of Node.js's Web-related projects. However, it is important to note that the Node.js Web Team is not a set of siloed teams, but rather a set of teams that work together to achieve the same goal: Providing the best Web Experience for Node.js.

Following this line of thought, the Web Infra Team is responsible for the technical aspects of the Node.js Website (Infrastructure, Framework, CI/CD, etc); The Website Team is responsible for the day-to-day development of the Node.js Website; The UX and Design Team advise on Design Matters and the Web Standards Team advise on best-practices for Web APIs and Web Technologies/Standards.

But above all, the Web Team should work together to better the Web Experience for Node.js, aiming to provide the best experience for Node.js users.

## Blog post publishing guidelines

The following guidelines apply to all blog posts except minor or patch release announcements:

1. each blog post _must_ have a target publishing date and time. If scheduled publishing is not possible, _the author_ (if privileged enough) or another delegated member would be responsible for landing.
2. each blog post _must_ be approved by @nodejs/tsc members _and_ OpenJS Foundation marketing staff.

For minor/patch release announcements, the members of `@nodejs/releasers` can land as they see fit.
