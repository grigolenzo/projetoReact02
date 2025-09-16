import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`min-height:100vh;padding:1rem;`;
export default function Kanban(){
  return (
    <Wrapper>
      <h1>Kanban (exemplo)</h1>
      <p>Funcionalidades básicas de mover tarefas estão disponíveis no exemplo original.</p>
    </Wrapper>
  );
}
