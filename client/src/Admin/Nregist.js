import './Basic.css';

export default function Nregist() {
    return(
        <div className="Page">
            <span><b>공지사항/이벤트 관리 &gt; 공지사항/이벤트 등록</b></span>
            <hr/>
            <form method="POST">
                <table>
                    <tr className="Ttitle">
                        <td colspan="2">&nbsp;공지사항/이벤트 등록</td>
                    </tr>
                    <tr>
                        <td className="Tname"> &nbsp;제목 </td><td>&nbsp;<input type="text" name="title" /></td>
                    </tr>
                    <tr>
                        <td> &nbsp;진행기간 </td><td>&nbsp;<input type="date" name="start_period" /> ~ <input type="date" name="finish" /></td>
                    </tr>
                    <tr>
                        <td> &nbsp;상세내용 </td><td>&nbsp;<input type="text" name="contents" /></td>
                    </tr>
                    <tr>
                        <td> &nbsp;배너 이미지 등록 </td><td>&nbsp;<input type="file" name="image" accept="img/*"/></td>
                    </tr>
                </table>
                <br/>
                <input type="submit" value="등록"/>
            </form>
        </div>
    )
}