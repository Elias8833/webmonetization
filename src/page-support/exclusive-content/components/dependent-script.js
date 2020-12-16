import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { CopyContent } from './copy-content'

import { useExclusiveContent } from '../state'

export function DependentScript() {
  const [exclusiveContent] = useExclusiveContent()
  const proxyPaymentPointer = exclusiveContent.verifier.endsWith('/')
    ? exclusiveContent.verifier
    : exclusiveContent.verifier + '/'
  // TODO: change url to exclusive content script
  const dependentScript = `<script type="module">
  import { exclusiveContent } from "./exclusive-content.js";

  const data = {
    paymentPointer: "${exclusiveContent.pointer}",
    proxyPaymentPointer: "${proxyPaymentPointer}${encodeURIComponent(
    exclusiveContent.pointer
  )}",
    cypherText: "${exclusiveContent.cypherText}",
    cypherVerifier: "${exclusiveContent.cypherVerifier}",
    initVector: "${exclusiveContent.initVector}",
    nonce: "${exclusiveContent.nonce}",
    receipt: "",
  };

  exclusiveContent(data);
</script>`

  return (
    <>
      <div>
        <CopyContent
          id='dependentScript'
          message='Copy script with dependencies'
        />
        <SyntaxHighlighter id='dependentScript' language='html' style={docco}>
          {dependentScript}
        </SyntaxHighlighter>
      </div>
    </>
  )
}
