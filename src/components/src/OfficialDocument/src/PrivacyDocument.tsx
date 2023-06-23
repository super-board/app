import * as React from "react";

import {StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";

import colors from "@/constants/colors";
import typography from "@/constants/typography";

import SizedBox from "../../SizedBox";

type Props = {
  style?: StyleProp<ViewStyle>;
};

export default function PrivacyDocument({style}: Props) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={[typography.subhead03, typography.textWhite]}>수집방법</Text>
          </View>
          <View style={styles.cell}>
            <Text style={[typography.subhead03, typography.textWhite]}>수집항목</Text>
          </View>
          <View style={styles.cell}>
            <Text style={[typography.subhead03, typography.textWhite]}>수집 및 이용목적</Text>
          </View>
          <View style={styles.cell}>
            <Text style={[typography.subhead03, typography.textWhite]}>보유 및 이용기간</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={[typography.caption, typography.textWhite]}>회원가입 및 본인인증</Text>
          </View>
          <View style={styles.cell}>
            <Text style={[typography.caption, typography.textWhite]}>
              1) 이메일 가입 시 : 닉네임, 이메일 주소, 비밀번호{"\n"}
              2) 소셜 로그인 시 : {"\n"}
              &nbsp;&nbsp;- 애플 : 이메일, Apple ID 코드{"\n"}
              &nbsp;&nbsp;- 네이버 : 이용자 고유식별자(ID), 이메일{"\n"}
              &nbsp;&nbsp;- 카카오 : 로그인 정보 식별 값, 프로필 정보(닉네임 등), 이메일
            </Text>
          </View>
          <View style={styles.cell}>
            <Text style={[typography.caption, typography.textWhite]}>
              서비스 이용 및 상담, 문의 회신, 서비스 개선을 위한 분석 등
            </Text>
          </View>
          <View style={styles.cell}>
            <Text style={[typography.subhead03, typography.textWhite]}>
              회원탈퇴 및 목적달성 후 일정 기간이 지난 후 삭제합니다.
            </Text>
            <Text style={[typography.caption, typography.textWhite]}>
              단, 이용자로부터 별도 동의를 얻은 경우나 관련 법령에서 일정 기간 보관 의무를 부과하는
              경우에는 해당 기간 동안 이를 보관한 후 파기합니다.
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={[typography.caption, typography.textWhite]}>
              서비스 이용 과정에서 생성
            </Text>
          </View>
          <View style={styles.cell}>
            <Text style={[typography.caption, typography.textWhite]}>
              서비스 이용 기록, 접속 로그, IP, 쿠키, 온라인 식별자, 단말기 정보(제조사, OS종류,
              버전)
            </Text>
          </View>
          <View style={styles.cell}>
            <Text style={[typography.caption, typography.textWhite]}>
              이상행위 탐지 및 서비스 개선을 위한 분석, 이용자의 관심, 기호, 성향 추정을 통한 맞춤형
              콘텐츠 및 서비스 제공
            </Text>
          </View>
          <View style={styles.cell}>
            <Text style={[typography.caption, typography.textWhite]}>상동</Text>
          </View>
        </View>
      </View>

      <SizedBox height={12} />
      <Text style={[typography.caption, typography.textWhite]}>
        관련 법령의 규정에 따라 개인정보를 일정기간 보유 할 수 있습니다.
      </Text>

      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={[typography.subhead03, typography.textWhite]}>법령</Text>
          </View>
          <View style={styles.cell}>
            <Text style={[typography.subhead03, typography.textWhite]}>항목</Text>
          </View>
          <View style={styles.cell}>
            <Text style={[typography.subhead03, typography.textWhite]}>기간</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <Text style={[typography.caption, typography.textWhite]}>통신비밀보호법</Text>
          </View>
          <View style={styles.cell}>
            <Text style={[typography.caption, typography.textWhite]}>
              서비스 이용 관련 개인정보 (로그기록)
            </Text>
          </View>
          <View style={styles.cell}>
            <Text style={[typography.caption, typography.textWhite]}>3개월</Text>
          </View>
        </View>
      </View>

      <SizedBox height={12} />
      <Text style={[typography.subhead03, typography.textWhite]}>
        동의를 거부할 권리 및 거부 경우의 불이익
      </Text>
      <Text style={[typography.caption, typography.textWhite]}>
        귀하께서는 온더보드가 위와 같이 수집하는 개인정보에 대해 동의하지 않거나 개인정보를 기재하지
        않음으로써 거부할 수 있습니다. 다만, 이때 회원에게 제공되는 서비스가 제한될 수 있습니다.
      </Text>
      <SizedBox height={12} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {gap: 8},
  table: {borderLeftWidth: 1, borderTopWidth: 1, borderColor: colors.white},
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    borderBottomWidth: 1,
    borderColor: colors.white,
  },
  cell: {flex: 1, padding: 4, borderRightWidth: 1, borderColor: colors.white},
});
