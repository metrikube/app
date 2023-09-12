import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { format } from 'sql-formatter';

interface Props {
  code: string
}
const SqlCodeBlock = ({ code }: Props) => {
  const formattedSql = format(code, { language: 'mariadb' })
  return (
    <SyntaxHighlighter language="sql" style={solarizedlight}>
      {formattedSql}
    </SyntaxHighlighter>
  )
}

export default SqlCodeBlock
