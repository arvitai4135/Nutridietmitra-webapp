// import React from 'react';
// import { styled } from '@mui/material/styles';
// import { Tooltip, Divider, Select, MenuItem, FormControl } from '@mui/material';
// import { Icon } from '@iconify/react';

// const ToolbarStyle = styled('div')(({ theme, isFloating }) => ({
//   display: 'flex',
//   flexWrap: 'wrap',
//   alignItems: 'center',
//   gap: theme.spacing(0.5),
//   padding: theme.spacing(1),
//   borderBottom: isFloating ? 'none' : 'solid 1px #e5e7eb',
//   backgroundColor: isFloating ? '#FCF0F8' : '#FCF0F8',
//   borderRadius: isFloating ? 4 : '4px 4px 0 0',
//   boxShadow: isFloating ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
//   fontFamily: 'Arial, sans-serif',
//   [theme.breakpoints.down('sm')]: {
//     gap: theme.spacing(0.25),
//   },
// }));

// const ToolbarGroup = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   [theme.breakpoints.down('sm')]: {
//     flexWrap: 'wrap',
//   },
// }));

// const ButtonStyle = styled('button')(({ theme, active }) => ({
//   padding: theme.spacing(0.5),
//   borderRadius: theme.shape.borderRadius,
//   cursor: 'pointer',
//   backgroundColor: active ? 'rgba(173, 208, 28, 0.15)' : 'transparent',
//   border: 'none',
//   height: 36,
//   width: 36,
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   color: '#333333',
//   '&:hover': {
//     backgroundColor: 'rgba(173, 208, 28, 0.08)',
//   },
//   '&:disabled': {
//     color: '#718096',
//     cursor: 'default',
//     backgroundColor: 'transparent',
//   },
//   fontFamily: 'Arial, sans-serif',
// }));

// const StyledSelect = styled(FormControl)(({ theme }) => ({
//   minWidth: 120,
//   margin: theme.spacing(0, 1),
//   '& .MuiOutlinedInput-root': {
//     backgroundColor: '#FCF0F8',
//     color: '#333333',
//     fontFamily: 'Arial, sans-serif',
//     height: 36,
//     '& fieldset': {
//       borderColor: '#D93BB1',
//     },
//     '&:hover fieldset': {
//       borderColor: '#9E0B7F',
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: '#9E0B7F',
//     },
//   },
//   '& .MuiSelect-select': {
//     padding: theme.spacing(1),
//     color: '#333333',
//   },
//   [theme.breakpoints.down('sm')]: {
//     minWidth: 90,
//     margin: theme.spacing(0, 0.5),
//   },
// }));

// const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
//   color: '#333333',
//   backgroundColor: '#FCF0F8',
//   fontFamily: 'Arial, sans-serif',
//   '&:hover': {
//     backgroundColor: 'rgba(173, 208, 28, 0.08)',
//   },
//   '&.Mui-selected': {
//     backgroundColor: 'rgba(173, 208, 28, 0.15)',
//     color: '#333333',
//   },
// }));

// const VerticalDivider = styled(Divider)(({ theme }) => ({
//   height: 24,
//   margin: theme.spacing(0, 0.5),
//   backgroundColor: '#D93BB1',
// }));

// const TiptapEditorToolbar = ({ editor, isFloating = false, setImageUploadModal }) => {
//   if (!editor || !editor.current) return null;

//   const fontFamilies = [
//     { label: 'Sans Serif', value: 'Arial, sans-serif' },
//     { label: 'Serif', value: 'Georgia, serif' },
//     { label: 'Monospace', value: 'monospace' },
//   ];

//   const fontSizes = [
//     { label: 'Small', value: '0.875rem' },
//     { label: 'Normal', value: '1rem' },
//     { label: 'Large', value: '1.25rem' },
//     { label: 'Huge', value: '1.5rem' },
//   ];

//   const headings = [
//     { label: 'Paragraph', value: 'paragraph' },
//     { label: 'Heading 1', value: 'h1' },
//     { label: 'Heading 2', value: 'h2' },
//     { label: 'Heading 3', value: 'h3' },
//   ];

//   const handleHeadingChange = (value) => {
//     if (value === 'paragraph') editor.current.chain().focus().setParagraph().run();
//     else editor.current.chain().focus().toggleHeading({ level: parseInt(value.replace('h', '')) }).run();
//   };

//   const canUndo = editor.current.can().undo();
//   const canRedo = editor.current.can().redo();

//   return (
//     <ToolbarStyle isFloating={isFloating}>
//       {!isFloating && (
//         <>
//           <ToolbarGroup>
//             <StyledSelect variant="outlined" size="small">
//               <Select
//                 defaultValue="Arial, sans-serif"
//                 onChange={(e) => editor.current.commands.setFontFamily(e.target.value)}
//               >
//                 {fontFamilies.map((font) => (
//                   <StyledMenuItem key={font.value} value={font.value}>
//                     {font.label}
//                   </StyledMenuItem>
//                 ))}
//               </Select>
//             </StyledSelect>
//             <StyledSelect variant="outlined" size="small">
//               <Select
//                 defaultValue="1rem"
//                 onChange={(e) => editor.current.commands.setFontSize(e.target.value)}
//               >
//                 {fontSizes.map((size) => (
//                   <StyledMenuItem key={size.value} value={size.value}>
//                     {size.label}
//                   </StyledMenuItem>
//                 ))}
//               </Select>
//             </StyledSelect>
//             <StyledSelect variant="outlined" size="small">
//               <Select
//                 value={
//                   editor.current.isActive('heading', { level: 1})
//                     ? 'h1'
//                     : editor.current.isActive('heading', { level: 2})
//                     ? 'h2'
//                     : editor.current.isActive('heading', { level: 3})
//                     ? 'h3'
//                     : 'paragraph'
//                 }
//                 onChange={(e) => handleHeadingChange(e.target.value)}
//               >
//                 {headings.map((heading) => (
//                   <StyledMenuItem key={heading.value} value={heading.value}>
//                     {heading.label}
//                   </StyledMenuItem>
//                 ))}
//               </Select>
//             </StyledSelect>
//           </ToolbarGroup>
//           <VerticalDivider orientation="vertical" flexItem />
//         </>
//       )}
//       <ToolbarGroup>
//         <Tooltip title="Bold">
//           <ButtonStyle
//             onClick={() => editor.current.chain().focus().toggleBold().run()}
//             active={editor.current.isActive('bold')}
//           >
//             <Icon icon="mdi:format-bold" width={20} />
//           </ButtonStyle>
//         </Tooltip>
//         <Tooltip title="Italic">
//           <ButtonStyle
//             onClick={() => editor.current.chain().focus().toggleItalic().run()}
//             active={editor.current.isActive('italic')}
//           >
//             <Icon icon="mdi:format-italic" width={20} />
//           </ButtonStyle>
//         </Tooltip>
//         <Tooltip title="Underline">
//           <ButtonStyle
//             onClick={() => editor.current.chain().focus().toggleUnderline().run()}
//             active={editor.current.isActive('underline')}
//           >
//             <Icon icon="mdi:format-underline" width={20} />
//           </ButtonStyle>
//         </Tooltip>
//         <Tooltip title="Strike">
//           <ButtonStyle
//             onClick={() => editor.current.chain().focus().toggleStrike().run()}
//             active={editor.current.isActive('strike')}
//           >
//             <Icon icon="mdi:format-strikethrough" width={20} />
//           </ButtonStyle>
//         </Tooltip>
//         <Tooltip title="Quote">
//           <ButtonStyle
//             onClick={() => editor.current.chain().focus().toggleBlockquote().run()}
//             active={editor.current.isActive('blockquote')}
//           >
//             <Icon icon="mdi:format-quote-close" width={20} />
//           </ButtonStyle>
//         </Tooltip>
//       </ToolbarGroup>
//       <VerticalDivider orientation="vertical" flexItem />
//       <ToolbarGroup>
//         <Tooltip title="Bullet List">
//           <ButtonStyle
//             onClick={() => editor.current.chain().focus().toggleBulletList().run()}
//             active={editor.current.isActive('bulletList')}
//           >
//             <Icon icon="mdi:format-list-bulleted" width={20} />
//           </ButtonStyle>
//         </Tooltip>
//         <Tooltip title="Numbered List">
//           <ButtonStyle
//             onClick={() => editor.current.chain().focus().toggleOrderedList().run()}
//             active={editor.current.isActive('orderedList')}
//           >
//             <Icon icon="mdi:format-list-numbered" width={20} />
//           </ButtonStyle>
//         </Tooltip>
//       </ToolbarGroup>
//       <VerticalDivider orientation="vertical" flexItem />
//       <ToolbarGroup>
//         <Tooltip title="Insert Link">
//           <ButtonStyle
//             onClick={() => {
//               const url = window.prompt('URL');
//               if (url) editor.current.chain().focus().setLink({ href: url }).run();
//             }}
//             active={editor.current.isActive('link')}
//           >
//             <Icon icon="mdi:link" width={20} />
//           </ButtonStyle>
//         </Tooltip>
//         <Tooltip title="Insert Image">
//           <ButtonStyle onClick={() => setImageUploadModal(true)}>
//             <Icon icon="mdi:image" width={20} />
//           </ButtonStyle>
//         </Tooltip>
//       </ToolbarGroup>
//       <VerticalDivider orientation="vertical" flexItem />
//       <ToolbarGroup>
//         <Tooltip title="Code Block">
//           <ButtonStyle
//             onClick={() => editor.current.chain().focus().toggleCodeBlock().run()}
//             active={editor.current.isActive('codeBlock')}
//           >
//             <Icon icon="mdi:code-tags" width={20} />
//           </ButtonStyle>
//         </Tooltip>
//         <Tooltip title="Clear Format">
//           <ButtonStyle
//             onClick={() => editor.current.chain().focus().unsetAllMarks().clearNodes().run()}
//           >
//             <Icon icon="mdi:format-clear" width={20} />
//           </ButtonStyle>
//         </Tooltip>
//       </ToolbarGroup>
//       <VerticalDivider orientation="vertical" flexItem />
//       <ToolbarGroup>
//         <Tooltip title="Undo">
//           <ButtonStyle onClick={() => editor.current.chain().focus().undo().run()} disabled={!canUndo}>
//             <Icon icon="mdi:undo" width={20} />
//           </ButtonStyle>
//         </Tooltip>
//         <Tooltip title="Redo">
//           <ButtonStyle onClick={() => editor.current.chain().focus().redo().run()} disabled={!canRedo}>
//             <Icon icon="mdi:redo" width={20} />
//           </ButtonStyle>
//         </Tooltip>
//       </ToolbarGroup>
//     </ToolbarStyle>
//   );
// };

// export default TiptapEditorToolbar;