import { useEffect, useRef, useState } from "react";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
import { Button } from "antd";
import { ExpandOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import { getMarkupString } from "../../services/AiService";
import { useAppSelector } from "../../store/hooks";

const MindMap = () => {
  const { chatId } = useParams()
  const {mode} = useAppSelector((state)=>state.utils.theme)
  const [markup, setMarkup] = useState('')
  const getMarkup = async () => {
    try {
      let resp = await getMarkupString({ chatId: chatId })
      if (!resp?.data?.status) throw new Error(`${resp}`)
      setMarkup(resp?.data?.results.markup || '')
    } catch (err) {
      console.log(err);
    }
  }

  const [mm, setMm] = useState<any>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    getMarkup();
  }, [])

  useEffect(() => {
    const transformer = new Transformer();
    const { root } = transformer.transform(markup);
    if (svgRef.current) {
      const markmap = Markmap.create(svgRef.current, { autoFit: true, zoom: true }, root);
      setMm(markmap);
    }
  }, [markup]);

  const handleFit = () => mm?.fit();

  return (
    <div className={`w-full h-full ${mode == 'light' && 'bg-gray-50'}`}>
      <svg ref={svgRef} className="w-full h-[93%]" />
      <div className="flex justify-end gap-2 mr-2">
        <Button shape="circle" onClick={handleFit} icon={<ExpandOutlined />} />
      </div>
    </div>
  )
}

export default MindMap