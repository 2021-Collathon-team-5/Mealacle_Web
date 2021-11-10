# Mealacle

## GitHub

### Upload

1. branch -> git checkout junghun2/master/seungkyu 처럼
2. git push origin junghun2 를 했을경우
3. git checkout master -> git merge junghun2
4. git push origin master 한 이후에
5. git checkout junghun2 를 하면 업로드 성공

### pull

- fetch and merge .
- 즉 패치 후 병합한다는 얘기 => 충돌(Confilct) 발생 가능

### Merge Branch

- 각자 seungkyu, junghun2 브랜치에서 작업 후 커밋, 푸쉬 .
- 그 후 master 브랜치로 checkout 한 후 pull origin 브랜치명 or merge 브랜치명 해주면 합쳐진다.
- master 브랜치 commit - push 하면 master에 정상적으로 병합된다.
- ※ 참고로 헷갈릴 수 있는게 local branches와 remote repository branches를 구별해야한다.
- local branches는 junghun2 , master 등이 되고, remote branches는 origin/junghun2, origin/master 등이 된다고 보면 됨.
- git log --branches --graph --oneline 사용하면 한눈에 브랜치와 커밋 현황을 알 수 있다.
