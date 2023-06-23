import React from "react";

import {StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";

import typography from "@/constants/typography";

import SizedBox from "../../SizedBox";

type Props = {
  style?: StyleProp<ViewStyle>;
};

export default function TermsAndCondition({style}: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[typography.subhead02, typography.textWhite]}>제1조 (목적)</Text>
      <Text style={[typography.body02, typography.textWhite]}>
        이 약관은 알아라슈퍼보드(이하 ‘운영진’)가 제공하는 서비스의 이용과 관련하여 서비스와
        이용자와의 권리, 의무 및 책임사항 등을 규정함을 목적으로 합니다.
      </Text>
      <SizedBox height={8} />
      <Text style={[typography.subhead02, typography.textWhite]}>제2조 (정의)</Text>
      <Text style={[typography.body02, typography.textWhite]}>
        본 약관에서 사용하는 용어의 정의는 다음과 같습니다. {"\n"}
        {"\n"}
        1. “운영진”이라 함은 콘텐츠 산업과 관련된 모바일 서비스를 제공하는 자를 말합니다.{"\n"}
        {"\n"}
        2. “이용자”라 함은 서비스에 접속하여 이 약관에 따라 콘텐츠 및 제반 서비스를 이용하는
        이용자를 말합니다. 이용자는 “회원가입”을 통해 서비스를 이용하는 모든 “회원”을 말합니다.
        {"\n"}
        {"\n"}
        3. “콘텐츠”라 함은 정보통신망이용촉진 및 정보보호 등에 관한 법률 제2조 제1항 제1호의 규정에
        의한 정보통신망에서 사용되는 부호•문자 표현된 자료 또는 정보로서, 그 보존 및 이용에 있어서
        효용을 높일 수 있도록 전자적 형태로 제작 또는 처리된 것을 말하며 “서비스”를 이용함에 있어
        게시한 정보 형태의 글 등을 의미합니다.{"\n"}
        {"\n"}
        4. “로그”라 함은 이용자가 서비스를 이용하면서 자동으로 생성된 IP주소, 접속 시간 등을
        말합니다.
      </Text>
      <SizedBox height={8} />
      <Text style={[typography.subhead02, typography.textWhite]}>
        제 3조 (약관 등의 명시와 설명 및 개정)
      </Text>
      <Text style={[typography.body02, typography.textWhite]}>
        1. ‘운영진’은 이 약관을 회원가입 화면 등에 게시합니다.{"\n"}
        {"\n"}
        2. ‘운영진’은 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.{"\n"}
        {"\n"}
        3. 개정 내용이 회원에게 불리할 경우, 적용일자 및 개정사유를 명시하여 현행약관과 함께
        팝업으로 30일간 게시합니다.{"\n"}
        {"\n"}
        4. 회원이 개정약관에 동의하지 않는 경우, 이용계약을 해지함으로써 거부 의사를 표현할 수
        있습니다. 단, 30일 내에 거부 의사 표시를 하지 않을 경우 약관에 동의한 것으로 간주합니다.
        {"\n"}
        {"\n"}
        5. 회원은 약관 일부분만을 동의 또는 거부할 수 있습니다.{"\n"}
        {"\n"}
        6. 비회원이 서비스를 이용할 경우, 이 약관에 동의한 것으로 간주합니다.
      </Text>
      <SizedBox height={8} />
      <Text style={[typography.subhead02, typography.textWhite]}>
        재 4조 (개인정보의 관리 및 보호)
      </Text>
      <Text style={[typography.body02, typography.textWhite]}>
        1. 회원이 체결한 서비스 이용계약은 처음 이용계약을 체결한 본인에 한해 적용됩니다.{"\n"}
        {"\n"}
        2. 회원은 회원가입 시 등록한 정보에 변동이 있을 경우, 즉시 "마이페이지" 메뉴 등을 이용하여
        정보를 최신화해야 합니다.{"\n"}
        {"\n"}
        3. 회원의 아이디, 비밀번호 등 모든 개인정보의 관리책임은 본인에게 있으므로, 타인에게 양도 및
        대여할 수 없으며, 유출되지 않도록 관리해야 합니다. 만약 본인의 아이디 및 비밀번호를 타인이
        사용하고 있음을 인지했을 경우 바로 서비스 내부의 문의 창구에 알려야 하고, 안내가 있는 경우
        이에 즉시 따라야 합니다.{"\n"}
        {"\n"}
        4. ‘운영진’은 2항부터 전항까지를 이행하지 않아 발생한 피해에 대해 어떠한 책임을 지지
        않습니다.
      </Text>
      <SizedBox height={8} />
      <Text style={[typography.subhead02, typography.textWhite]}>
        제 5조 (회원탈퇴 및 자격 상실 등)
      </Text>
      <Text style={[typography.body02, typography.textWhite]}>
        1. "회원"은 "운영진"에 언제든지 탈퇴를 요청할 수 있으며 "운영진"은 즉시 회원탈퇴를
        처리합니다.{"\n"}
        {"\n"}
        2. "회원"이 다음 각호의 사유에 해당하는 경우, "운영진"은 회원자격을 제한 및 정지시킬 수
        있습니다.{"\n"}
        {"\n"}
        &nbsp;&nbsp;- 가입신청 시에 허위내용을 등록한 경우{"\n"}
        {"\n"}
        &nbsp;&nbsp; - 다른 사람의 서비스이용을 방해하거나 그 정보를 도용하는 등 전자상거래 질서를
        위협하는 경우{"\n"}
        {"\n"}
        &nbsp;&nbsp;- "운영진"을 이용하여 법령 또는 이 약관이 금지하거나 공서양속에 반하는 행위를
        하는 경우{"\n"}
        {"\n"}
        3. "운영진"이 회원자격을 제한·정지시킨 후, "운영진"은 회원자격을 상실시킬 수 있습니다.{"\n"}
        {"\n"}
        4. "운영진"이 회원자격을 상실시키는 경우에는 회원등록을 말소합니다.
      </Text>
      <SizedBox height={8} />
      <Text style={[typography.subhead02, typography.textWhite]}>제 6조 (서비스 제공)</Text>
      <Text style={[typography.body02, typography.textWhite]}>
        1. “운영진”은 다음 서비스를 제공합니다.{"\n"}
        {"\n"}
        &nbsp;&nbsp;- 보드게임 정보 제공 서비스{"\n"}
        {"\n"}
        &nbsp;&nbsp;- 보드게임에 대한 후기 제공 서비스{"\n"}
        {"\n"}
        &nbsp;&nbsp;- 보드게임 추천 서비스{"\n"}
        {"\n"}
        &nbsp;&nbsp;- 기타 ‘운영진’이 정하는 서비스{"\n"}
        {"\n"}
        2. “운영진”은 운영상, 기술상의 필요에 따라 제공하고 있는 서비스를 변경할 수 있습니다.{"\n"}
        {"\n"}
        3. “운영진”은 이용자의 개인정보 및 서비스 이용 기록에 따라 서비스 이용에 차이를 둘 수
        있습니다.{"\n"}
        {"\n"}
        4. “운영진”은 천재지변, 인터넷 장애, 경영 약화 등으로 서비스를 더 이상 제공하기 어려울 경우,
        서비스를 통보 없이 중단할 수 있습니다.{"\n"}
        {"\n"}
        5. “운영진” 1항부터 전항까지와 다음 내용으로 발생한 피해에 대해 어떠한 책임을 지지 않습니다.
        {"\n"}
        {"\n"}
        &nbsp;&nbsp;- 모든 서비스, 게시물, 이용 기록의 진본성, 무결성, 신뢰성, 이용가능성{"\n"}
        {"\n"}
        &nbsp;&nbsp;- 서비스 이용 중 타인과 상호 간에 합의한 내용{"\n"}
        {"\n"}
        &nbsp;&nbsp;- 게시물, 광고의 버튼, 하이퍼링크 등 외부로 연결된 서비스와 같이 회사가 제공하지
        않은 서비스에서 발생한 피해{"\n"}
        {"\n"}
        &nbsp;&nbsp;- 이용자의 귀책사유 또는 회사의 귀책 사유가 아닌 사유로 발생한 이용자의 피해
      </Text>
      <SizedBox height={8} />
      <Text style={[typography.subhead02, typography.textWhite]}>제 7조 (저작권의 귀속)</Text>
      <Text style={[typography.body02, typography.textWhite]}>
        1. “운영진”은 유용하고 편리한 서비스를 제공하기 위해, 서비스 및 서비스 내부의 기능(보드게임
        정보, 보드게임 상세정보, 보드게임 후기 등)의 체계와 다양한 기능을 직접 설계 및 운영하고 있는
        데이터베이스 제작자에 해당합니다. “운영진”은 저작권법에 따라 데이터베이스 제작자는 복제권 및
        전송권을 포함한 데이터베이스 전부에 대한 권리를 가지고 있으며, 이는 법률에 따라 보호를 받는
        대상입니다. 따라서 “회원”은 데이터베이스 제작자인 “운영진”의 승인 없이 데이터베이스의 전부
        또는 일부를 복제,배포,방송 또는 전송할 수 없습니다.{"\n"}
        {"\n"}
        2. “운영진”이가 작성한 게시물에 대한 권리는 “운영진”에게 귀속되며, “회원”이 작성한 게시물에
        대한 권리는 “회원”에게 귀속됩니다.
      </Text>
      <SizedBox height={8} />
      <Text style={[typography.subhead02, typography.textWhite]}>제 8조 (게시물의 게시 중단)</Text>
      <Text style={[typography.body02, typography.textWhite]}>
        “운영진” 은 관련법에 의거하여 “회원”의 게시물로 인한 법률상 이익 침해를 근거로, 다른 이용자
        또는 제3자가 회원 또는 “운영진”을 대상으로 하여 민형사상의 법적 조치를 취하거나 관련된
        게시물의 게시중단을 요청하는 경우, “운영진”은 해당 게시물에 대한 접근을 잠정적으로
        제한하거나 삭제할 수 있습니다
      </Text>
      <SizedBox height={8} />
      <Text style={[typography.subhead02, typography.textWhite]}>제 9조 (운영진의 면책)</Text>
      <Text style={[typography.body02, typography.textWhite]}>
        1. “운영진”은 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는
        서비스 제공에 관하여 책임을 지지 않습니다.{"\n"}
        {"\n"}
        2. “운영진”은 서비스용 설비의 보수, 교체, 정기점검, 공사 등 기타 이에 준하는 사유로 발생한
        손해에 대하여 책임을 지지 않습니다. 다만, 고의 또는 과실에 의한 경우에는 그러하지
        아니합니다.{"\n"}
        {"\n"}
        3. “운영진” 은 회원의 고의 또는 과실로 인한 서비스 이용의 장애에 대하여는 책임을 지지
        않습니다. 다만, 회원에게 부득이하거나 정당한 사유가 있는 경우에는 그러하지 아니합니다.{"\n"}
        {"\n"}
        4. 회원이 서비스와 관련하여 게재한 정보나 자료 등의 신뢰성, 정확성 등에 대하여 운영진은 고의
        또는 중대한 과실이 없는 한 책임을 지지 않습니다.{"\n"}
        {"\n"}
        5. “운영진”은 회원이 다른 회원 또는 타인과 서비스를 매개로 발생한 거래나 분쟁에 대해 개입할
        의무가 없으며, 이로 인한 손해에 대해 책임을 지지 않습니다.{"\n"}
        {"\n"}
        6. “운영진”은 무료로 제공되는 서비스 이용과 관련하여 회원에게 발생한 손해에 대해서는 책임을
        지지 않습니다. 그러나 운영진의 고의 또는 중과실에 의한 경우에는 그러하지 아니합니다.{"\n"}
        {"\n"}
        7. “운영진”은 회원이 모바일 기기 비밀번호 등을 관리하지 않아 발생하는 제3자 결제에 대해
        책임을 지지 않습니다. 다만, 운영진의 고의 또는 과실에 의한 경우에는 그러하지 아니합니다.
        {"\n"}
        {"\n"}
        8. “운영진”이 모바일 기기의 변경, 모바일 기기의 번호 변경, 운영체제(OS) 버전의 변경, 해외
        로밍, 통신사 변경 등으로 인해 콘텐츠 전부나 일부의 기능을 이용할 수 없는 경우 운영진은 이에
        대해 책임을 지지 않습니다. 다만, 운영진의 고의 또는 과실에 의한 경우에는 그러하지
        아니합니다.{"\n"}
        {"\n"}
        9. “운영진”이 모바일 기기의 변경, 모바일 기기의 번호 변경, 운영체제(OS) 버전의 변경, 해외
        로밍, 통신사 변경 등으로 인해 콘텐츠 전부나 일부의 기능을 이용할 수 없는 경우“운영진”은 이에
        대해 책임을 지지 않습니다. 다만, “운영진”의 고의 또는 과실에 의한 경우에는 그러하지
        아니합니다.{"\n"}
        {"\n"}
        10. 회원이 “운영진”이 제공하는 콘텐츠나 계정정보를 삭제한 경우 “운영진”은 이에 대해 책임을
        지지 않습니다. 다만, “운영진”의 고의 또는 과실에 의한 경우에는 그러하지 아니합니다.
      </Text>
      <SizedBox height={8} />
      <Text style={[typography.subhead02, typography.textWhite]}>제 10조 (저작권)</Text>
      <Text style={[typography.body02, typography.textWhite]}>
        “회원”이 작성・게시한 리뷰에 관한 저작권은, 해당 리뷰를 작성한 “회원”에게 귀속합니다.{"\n"}
        {"\n"}
        “회원”은, “운영진”에 대해서, “운영진”이 리뷰를 다음의 목적으로 이용하는 것 (복제, 양도,
        대여, 번역, 번안 및 제3자에 대하여 재이용의 허락을 포함합니다)을 허락하는 것으로 합니다.
        {"\n"}
        {"\n"}
        (1) 당사 및 당사 그룹회사의 웹사이트나 카탈로그, 선전・광고, SNS 등의 판촉매체에의 게재
        {"\n"}
        {"\n"}
        (2) 당사 상품의 개량 및 신상품의 개발 전항의 경우, 고객은 당사 (당사로부터 사용허락 또는
        권리양도를 받은 제3자를 포함합니다)에 대해, 상품리뷰에 관련된 저작자인격권을 행사하지 않는
        것으로 합니다. 고객이 작성・게시한 상품리뷰 이외의, 본 서비스에 관한 저작권 등 일체의
        지적재산권은, 당사 또는 당사가 사용 허락하거나 당사로부터 권리양도를 받은 제3자에게
        귀속합니다.{"\n"}
        {"\n"}
        당사는, 고객이 작성・게시한 상품리뷰에 포함된 아이디어, 디자인 및 노하우 등 (이하 "아이디어
        등"이라고 합니다)을 이용할 수 있고, 아이디어 등에 관련하여 특허, 실용신안, 의장, 상표를 받는
        권리 및 출원할 수 있는 것으로 합니다. 당사는 아이디어 등을 고객의 승낙을 얻지 않고 이용
        (복제, 양도, 대여, 번역, 번안 및 제3자에 대하여 재이용의 허락을 포함합니다) 할 수 있는
        것으로 합니다.
      </Text>
      <SizedBox height={8} />
      <Text style={[typography.subhead02, typography.textWhite]}>제 11조 (금지행위)</Text>
      <Text style={[typography.body02, typography.textWhite]}>
        1. “회원”은 다음과 같은 행위를 해서는 안됩니다.{"\n"}
        {"\n"}
        1) 개인정보 또는 계정 기만, 침해, 공유 행위{"\n"}
        {"\n"}- 개인정보를 허위, 누락, 오기, 도용하여 작성하는 행위{"\n"}
        {"\n"}- 타인의 개인정보 및 계정을 수집, 저장, 공개, 이용하는 행위{"\n"}
        {"\n"}- 자신과 타인의 개인정보를 제3자에게 공개, 양도하는 행위{"\n"}
        {"\n"}- 다중 계정을 생성 및 이용하는 행위
        {"\n"}
        {"\n"}- 자신의 계정을 이용하여 타인의 요청을 이행하는 행위{"\n"}
        {"\n"}
        2) 시스템 부정행위{"\n"}
        {"\n"}- 허가하지 않은 방식의 서비스 이용 행위{"\n"}
        {"\n"}- 회사의 모든 재산에 대한 침해 행위{"\n"}
        {"\n"}
        3) 업무 방해 행위{"\n"}
        {"\n"}- 서비스 관리자 또는 이에 준하는 자격을 사칭하거나 허가없이 취득하여 직권을 행사하는
        행위{"\n"}
        {"\n"}- 회사 및 타인의 명예를 손상시키거나 업무를 방해하는 행위{"\n"}
        {"\n"}- 서비스 내부 정보 일체를 허가 없이 이용, 변조, 삭제 및 외부로 유출하는 행위{"\n"}
        {"\n"}
        4) 이 약관, 개인정보 처리방침, 커뮤니티 이용규칙에서 이행 및 비이행을 명시한 내용에 반하는
        행위{"\n"}
        {"\n"}
        5) 기타 현행법에 어긋나거나 부적절하다고 판단되는 행위{"\n"}
        {"\n"}
        2. “회원”이 1항에 해당하는 행위를 할 경우, “운영진”은 다음과 같은 조치를 영구적으로 취할 수
        있습니다.{"\n"}
        {"\n"}- 회원의 서비스 이용 권한, 자격, 혜택 제한 및 회수{"\n"}
        {"\n"}- 회원과 체결된 이용계약을 회원의 동의나 통보 없이 파기{"\n"}
        {"\n"}- 회원가입, 정보 접근, 게시글 작성 거부{"\n"}
        {"\n"}- 회원의 커뮤니티, 게시물, 이용기록을 임의로 삭제, 중단, 변경{"\n"}
        {"\n"}- 그 외 회사가 필요하다고 판단되는 조치{"\n"}
        {"\n"}
        3. “운영진”은 1항부터 전항까지로 인해 발생한 피해에 대해 어떠한 책임을 지지 않으며, “회원”은
        귀책사유로 인해 발생한 모든 손해를 배상할 책임이 있습니다.
      </Text>
      <SizedBox height={8} />
      <Text style={[typography.subhead02, typography.textWhite]}>제 12조 (기타)</Text>
      <Text style={[typography.body02, typography.textWhite]}>
        1. 이 약관은 2022년 3월 16일에 최신화 되었습니다.{"\n"}
        {"\n"}
        2. 이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 관련법 또는 관례에 따릅니다.
        {"\n"}
        {"\n"}
        3. 이 약관에도 불구하고 다른 약관이나 서비스 이용 중 안내 문구 등으로 달리 정함이 있는
        경우에는 해당 내용을 우선으로 합니다.
        {"\n"}
        {"\n"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {gap: 8},
});
