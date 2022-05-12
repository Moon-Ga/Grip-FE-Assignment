import {
  RecoilState,
  Resetter,
  SetterOrUpdater,
  useRecoilState,
  useResetRecoilState,
} from 'recoil';

export default function useAtom<T>(
  recoilState: RecoilState<T>
): [T, SetterOrUpdater<T>, Resetter] {
  const [value, setter] = useRecoilState(recoilState);
  const resetter = useResetRecoilState(recoilState);
  return [value, setter, resetter];
}
