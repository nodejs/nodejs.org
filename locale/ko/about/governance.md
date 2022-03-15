---
title: 프로젝트 거버넌스
layout: about.hbs
---

# 프로젝트 거버넌스

## 기술 결정 위원회(TSC, Technical Steering Committee)

<!--
The project is jointly governed by a Technical Steering Committee (TSC)
which is responsible for high-level guidance of the project.

The TSC has final authority over this project including:

* Technical direction
* Project governance and process (including this policy)
* Contribution policy
* GitHub repository hosting
* Conduct guidelines
* Maintaining the list of additional Collaborators
-->
프로젝트의 고수준 지침에 대한 책임이 있는 기술 결정 위원회(TSC)가 함께 프로젝트를 운영하고 있습니다.

TSC는 다음을 포함해서 이 프로젝트의 최종 권한을 가집니다.

* 기술적 방향
* 프로젝트 거버넌스와 절차 (이 정책을 포함해서)
* 기여 정책
* GitHub 저장소 호스팅
* 행동 지침
* 추가적인 협업자 목록의 관리

<!--
Initial membership invitations to the TSC were given to individuals who
had been active contributors, and who have significant
experience with the management of the project. Membership is
expected to evolve over time according to the needs of the project.

For the current list of TSC members, see the project
[README.md](https://github.com/nodejs/node/blob/master/README.md#tsc-technical-steering-committee).
-->
최초의 TSC 멤버십 초대는 활발한 기여자나 프로젝트 관리에 충분한 경험을 가진 사람들에게 주어졌습니다.
멤버십은 프로젝트의 요구사항에 따라 발전될 것입니다.

현재 TSC 회원 목록은 프로젝트
[README.md](https://github.com/nodejs/node/blob/master/README.md#tsc-technical-steering-committee)에서
볼 수 있습니다.

<!--
## Collaborators

The [nodejs/node](https://github.com/nodejs/node) GitHub repository is
maintained by the TSC and additional Collaborators who are added by the
TSC on an ongoing basis.

Individuals making significant and valuable contributions are made
Collaborators and given commit-access to the project. These
individuals are identified by the TSC and their addition as
Collaborators is discussed during the weekly TSC meeting.
-->
## 협업자

TSC와 TSC가 지속적으로 추가한 협업자들이
[nodejs/node](https://github.com/nodejs/node) GitHub 저장소를 관리하고 있습니다.

중요하고 가치 있는 기여를 하는 개인이 협업자가 되고 프로젝트의 커밋-접근 권한을 받습니다. 이러한 개인은
TSC가 인정하고 주간 TSC 회의에서 협업자로 추가하는 것을 논의합니다.

<!--
_Note:_ If you make a significant contribution and are not considered
for commit-access, log an issue or contact a TSC member directly and it
will be brought up in the next TSC meeting.

Modifications of the contents of the nodejs/node repository are made on
a collaborative basis. Anybody with a GitHub account may propose a
modification via pull request and it will be considered by the project
Collaborators. All pull requests must be reviewed and accepted by a
Collaborator with sufficient expertise who is able to take full
responsibility for the change. In the case of pull requests proposed
by an existing Collaborator, an additional Collaborator is required
for sign-off. Consensus should be sought if additional Collaborators
participate and there is disagreement around a particular
modification. See _Consensus Seeking Process_ below for further detail
on the consensus model used for governance.
-->
_Note:_ 중요한 기여를 했음에도 커밋 접근 권한을 얻지 못한다면 이슈를 남기거나 TSC 멤버에게
직접 연락을 취하면 다음 TSC 회의 때 다루게 될 것입니다.

nodejs/node 저장소 내용의 수정은 협업을 통해서 이뤄집니다. GitHub 계정을 가진 누구나 풀 리퀘스트로
수정을 제안할 수 있고 프로젝트 협업자가 이를 검토할 것입니다. 모든 풀 리퀘스트는 반드시 리뷰를
받아야 하고 변경사항에 대한 전체 책임을 지고 상당한 전문성을 가진 협업자가 이를 받아들일 것입니다.
기존의 협업자가 제안한 풀 리퀘스트는 다른 협업자가 승인해야 합니다. 다른 협업자가 관여해서
특정 수정 부분에 대해서 동의하지 않는다면 합의가 이루어져야 합니다. 거버넌스의 합의 모델에 관한
더 자세한 내용은 아래의 _합의점을 찾는 과정_을 보기 바랍니다.

<!--
Collaborators may opt to elevate significant or controversial
modifications, or modifications that have not found consensus to the
TSC for discussion by assigning the ***tsc-agenda*** tag to a pull
request or issue. The TSC should serve as the final arbiter where
required.

For the current list of Collaborators, see the project
[README.md](https://github.com/nodejs/node/blob/master/README.md#current-project-team-members).

A guide for Collaborators is maintained in
[collaborator-guide.md](https://github.com/nodejs/node/blob/master/doc/contributing/collaborator-guide.md).
-->
협업자는 TSC에서 논의하려고 풀 리퀘스트나 이슈에 ***tsc-agenda*** 태그를 할당함으로써 중요하거나
논쟁이 되는 수정사항이나 합의점을 찾지 못한 수정사항을 개선하려고 할 수도 있습니다.
TSC는 필요한 경우 최종 중재자가 되어야 합니다.

현재 협업자 목록은 프로젝트
[README.md](https://github.com/nodejs/node/blob/master/README.md#current-project-team-members)에서
볼 수 있습니다.

협업자 가이드는
[collaborator-guide.md](https://github.com/nodejs/node/blob/master/doc/contributing/collaborator-guide.md)에서
관리되어 있습니다.

<!--
## TSC Membership

TSC seats are not time-limited. There is no fixed size of the TSC.
However, the expected target is between 6 and 12, to ensure adequate
coverage of important areas of expertise, balanced with the ability to
make decisions efficiently.

There is no specific set of requirements or qualifications for TSC
membership beyond these rules.

The TSC may add additional members to the TSC by a standard TSC motion.
-->
## TSC 멤버십

TSC 멤버십은 기간 제한이 없고 TSC에 인원 제한도 없습니다. 하지만, 전문성과 균형을 가진 채
효율적인 결정을 하면서 중요한 영역을 충분히 다룰 수 있도록 6 ~ 12명 정도가 적당하다고 생각합니다.

이 규칙을 뛰어넘는 TSC 멤버십의 요구사항이나 자격에 대한 특정 조건은 없습니다.

TSC는 표준 TSC 발의를 통해 새로운 회원을 TSC에 추가할 것입니다.

<!--
A TSC member may be removed from the TSC by voluntary resignation, or by
a standard TSC motion.

Changes to TSC membership should be posted in the agenda, and may be
suggested as any other agenda item (see "TSC Meetings" below).

No more than 1/3 of the TSC members may be affiliated with the same
employer. If removal or resignation of a TSC member, or a change of
employment by a TSC member, creates a situation where more than 1/3 of
the TSC membership shares an employer, then the situation must be
immediately remedied by the resignation or removal of one or more TSC
members affiliated with the over-represented employer(s).
-->
TSC 회원은 자발적인 사퇴나 표준 TSC 발의를 통해 TSC에서 제외될 수 있습니다.

TSC 멤버십의 변경은 의제에 올라와야 하고 다른 의제로 제안될 수도 있습니다.(아래 "TSC 회의"를 보세요.)

TSC 회원의 1/3 이상이 같은 고용주와 관련되면 안 됩니다. TSC 회원이 제외되거나 사퇴하거나 TSC 회원의
고용상태가 바뀔 때 TSC 멤버십의 1/3 이상이 같은 고용주를 갖게 되는 상황이 만들어질 수 있습니다.
이 상황은 같은 고용주를 가진 1명 이상의 TSC 멤버가 사퇴하거나 제외됨으로써 즉시 해결되어야 합니다.

<!--
## TSC Meetings

The TSC meets weekly on a Google Hangout On Air. The meeting is run by
a designated moderator approved by the TSC. Each meeting should be
published to YouTube.

Items are added to the TSC agenda which are considered contentious or
are modifications of governance, contribution policy, TSC membership,
or release process.

The intention of the agenda is not to approve or review all patches.
That should happen continuously on GitHub and be handled by the larger
group of Collaborators.
-->
## TSC 회의

TSC는 구글 행아웃으로 매주 만납니다. TSC가 승인해서 선정한 중재자가 회의를 주최합니다.
각 회의는 YouTube로 발행되어야 합니다.

논쟁이 필요하거나 거버넌스, 기여 정책, TSC 멤버십, 릴리스 절차의 수정에 대한 주제가
TSC 의제에 추가됩니다.

이 의제의 의도는 모든 패치를 승인하거나 리뷰하는 것이 아닙니다. 이러한 승인이라 리뷰는
GitHub에서 계속해서 이루어지고 더 큰 협업자 그룹에서 다뤄집니다.

<!--
Any community member or contributor can ask that something be added to
the next meeting's agenda by logging a GitHub Issue. Any Collaborator,
TSC member or the moderator can add the item to the agenda by adding
the ***tsc-agenda*** tag to the issue.

Prior to each TSC meeting, the moderator will share the Agenda with
members of the TSC. TSC members can add any items they like to the
agenda at the beginning of each meeting. The moderator and the TSC
cannot veto or remove items.
-->
어떤 커뮤니티 회원이나 기여자도 GitHub에 이슈를 남김으로써 다음 미팅 일정에 무언가를 추가하도록
요청할 수 있습니다. 어떤 협업자, TSC 회원, 중재자라도 이슈에 ***tsc-agenda*** 태그를
추가해서 의제를 추가할 수 있습니다.

각 TSC 회의 전에 중재자는 TSC 회원과 의제를 공유할 것입니다. TSC 회원은 각 회의를 시작할 때
원하는 의제를 추가할 수 있습니다. 중재자와 TSC는 의제를 거부하거나 제거할 수 없습니다.

<!--
The TSC may invite persons or representatives from certain projects to
participate in a non-voting capacity. These invitees currently are:

* A representative from [build](https://github.com/node-forward/build)
  chosen by that project.

The moderator is responsible for summarizing the discussion of each
agenda item and sending it as a pull request after the meeting.
-->
TSC는 특정 프로젝트의 사람들이나 대표자가 투표권 없이 회의에 참여하도록 초대할 수 있습니다. 현재 이렇게 초대된 사람은 다음과 같습니다.

* [build](https://github.com/node-forward/build) 프로젝트에서 선택된 대표자

중재자는 각 의제를 논의한 내용을 요약하고 미팅 후에 풀 리퀘스트로 보낼 책임이 있습니다.

<!--
## Consensus Seeking Process

The TSC follows a
[Consensus Seeking](https://en.wikipedia.org/wiki/Consensus-seeking_decision-making)
decision making model.

When an agenda item has appeared to reach a consensus, the moderator
will ask "Does anyone object?" as a final call for dissent from the
consensus.

If an agenda item cannot reach a consensus, a TSC member can call for
either a closing vote or a vote to table the issue to the next
meeting. The call for a vote must be approved by a majority of the TSC
or else the discussion will continue. Simple majority wins.
-->
## 합의점을 찾는 과정

TSC는 [합의점 찾기](https://en.wikipedia.org/wiki/Consensus-seeking_decision-making) 의사결정 모델을 따릅니다.

의제가 합의점을 찾았을 때 중재자는 합의점에 대한 반대의견을 받기 위한 마지막 요청으로 "반대하는 사람 있습니까?"라고 물을 것입니다.

의제가 합의점에 이르지 못한다면 TSC 멤버는 투표를 종료하거나 다음 회의에 이슈를 올리도록 하는 투표를 요청할 수 있습니다. 투표요청은 반드시 TSC의 과반수가 동의해야 하고 그렇지 않으면 논의를 계속할 것입니다. 간단히 과반수가 이깁니다.
